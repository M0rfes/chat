import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: Observable<User>;
  private usersCollection: AngularFirestoreCollection<User>;
  private user: User;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }),
    );
    this.user$.subscribe(u => (this.user = u));
    this.usersCollection = this.afs.collection<User>('users');
  }
  createUser(user: User) {
    const userRef = this.afs.doc<User>(`users/${user.uid}`);
    return userRef.set({ ...user, favChats: [] }, { merge: true });
  }
  updateUserData(NewUser: Partial<User>) {
    return this.usersCollection.doc<User>(this.user.uid).update({ ...NewUser });
  }
  setOnline(isOnline: boolean) {
    return this.updateUserData({ isOnline });
  }
  findOne(uid: string) {
    return this.usersCollection.doc(uid).valueChanges();
  }
  getAll() {
    return this.usersCollection
      .valueChanges()
      .pipe(map(users => users.filter(user => user.uid !== this.user.uid)));
  }
  get(lastId: string) {
    return this.afs
      .collection<User>('users', ref =>
        ref
          .orderBy('uid')
          .startAfter(lastId)
          .limit(10),
      )
      .valueChanges();
  }
  allOnlineUsers() {
    return this.afs
      .collection<User>('users', ref => ref.where('isOnline', '==', true))
      .valueChanges();
  }
  addChatToFav(chatName: string) {
    if (this.user.favChats.includes(chatName)) {
      return this.updateUserData({
        favChats: this.user.favChats.filter(chat => chat !== chatName),
      });
    } else {
      return this.updateUserData({
        favChats: [...this.user.favChats, chatName],
      });
    }
  }
}

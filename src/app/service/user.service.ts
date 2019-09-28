import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: Observable<User>;
  user: User;

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
  }
  createUser(user: User) {
    const userRef = this.afs.doc<User>(`users/${user.uid}`);
    return userRef.set({ ...user, favChats: [] }, { merge: true });
  }
  updateUserData(NewUser: Partial<User>) {
    return this.afs.doc<User>(`users/${this.user.uid}`).update({ ...NewUser });
  }
  setOnline(isOnline: boolean) {
    return this.updateUserData({ isOnline });
  }
  findOne(uid: string) {
    return this.afs.doc<User>(`users/${uid}`).valueChanges();
  }
  getAll() {
    return this.afs.collection<User>('users').valueChanges();
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
    return this.updateUserData({ favChats: [...this.user.favChats, chatName] });
  }
}

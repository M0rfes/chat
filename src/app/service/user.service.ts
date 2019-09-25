import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: Observable<User>;
  user: User;

  private userCollectionRef: AngularFirestoreCollection<User>;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.user = user as any;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }),
    );
    this.userCollectionRef = this.afs.collection<User>('users');
  }
  createUser(user: User) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`,
    );
    return userRef.set({ ...user }, { merge: true });
  }
  updateUserData(NewUser: Partial<User>) {
    return this.userCollectionRef.doc(this.user.uid).update({ ...NewUser });
  }
  setOnline(isOnline: boolean) {
    return this.userCollectionRef.doc(this.user.uid).update({ isOnline });
  }
  findOne(uid: string) {
    return this.userCollectionRef.doc(uid).valueChanges();
  }
  getAll() {
    return this.userCollectionRef.get();
  }
  allOnlineUsers() {
    return this.afs
      .collection<User>('users', ref => ref.where('isOnline', '==', true))
      .valueChanges();
  }
}

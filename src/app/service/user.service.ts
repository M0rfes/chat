import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
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
  userCollectionRef: AngularFirestoreCollection<User>;
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
    this.userCollectionRef = this.afs.collection<User>('users');
  }
  createUser(user: User) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`,
    );
    return userRef.set({ ...user }, { merge: true });
  }
  updateUserData(Newuser: Partial<User>) {
    return this.user$.subscribe(user =>
      this.userCollectionRef.doc(user.uid).update({ ...user, ...Newuser }),
    );
  }
}

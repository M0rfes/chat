import { map, take, debounceTime } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { of } from 'rxjs';

export class NicknameValidator {
  static nickname(afs: AngularFirestore, user: User, isNew: boolean) {
    return (control: AbstractControl) => {
      const nickname = control.value;
      if (!isNew && nickname === user.nickname) {
        return of(null);
      }
      return afs
        .collection('users', ref => ref.where('nickname', '==', nickname))
        .valueChanges()
        .pipe(
          debounceTime(400),
          take(1),
          map(arr => (arr.length !== 0 ? { nickname: true } : null)),
        );
    };
  }
}

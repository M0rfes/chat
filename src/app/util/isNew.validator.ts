import { map, take, debounceTime } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

import { of } from 'rxjs';

export class IsNewValidator {
  static field<T>(
    afs: AngularFirestore,
    model: T,
    isNew: boolean,
    collection: string,
    field: string,
  ) {
    return (control: AbstractControl) => {
      const value: [keyof T] = control.value;
      if (!isNew && value === model[field]) {
        return of(null);
      }
      return afs
        .collection(collection, ref => ref.where(field, '==', value))
        .valueChanges()
        .pipe(
          debounceTime(400),
          take(1),
          map(arr => (arr.length !== 0 ? { notNew: true } : null)),
        );
    };
  }
}

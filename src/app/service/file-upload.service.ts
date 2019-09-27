import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  finalize,
  switchMap,
  debounce,
  delay,
  tap,
  last,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private afStor: AngularFireStorage) {}

  upload(path: string, file: File) {
    console.log(path);
    return this.afStor
      .upload(path, file)
      .snapshotChanges()
      .pipe(
        last(),
        // delay(1000),
        switchMap(() => this.afStor.ref(path).getDownloadURL()),
      );
  }
}

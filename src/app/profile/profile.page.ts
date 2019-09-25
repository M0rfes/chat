import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { NicknameValidator } from '../util/nickname.validator';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, switchMap, finalize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Input() new: boolean;
  @Input() user: User;
  form: FormGroup;
  photoURL: Observable<string>;
  file: File;
  constructor(
    private modalCon: ModalController,
    private asf: AngularFirestore,
    private afStor: AngularFireStorage,
    private formB: FormBuilder,
    private userS: UserService,
  ) {}

  ngOnInit(): void {
    this.photoURL = of(this.user.photoURL);
    const nickNameVal = [
      [Validators.required, Validators.minLength(5), Validators.maxLength(25)],
      [NicknameValidator.nickname(this.asf, this.user, this.new)],
    ];
    if (this.new) {
      this.form = this.formB.group({
        nickname: ['', ...nickNameVal],
      });
    } else {
      this.form = this.formB.group({
        nickname: [this.user.nickname, ...nickNameVal],
      });
    }
  }
  onPreview(uri: string) {
    this.photoURL = of(uri);
  }
  onFile(file: File) {
    this.file = file;
  }
  closeModal() {
    this.modalCon.dismiss();
  }
  private uploadProfilePhoto() {
    if (!this.file.type.includes('image')) {
      alert('not proper Image type');
      return null;
    } else {
      const path = `profile/${new Date().getTime()}_${this.file.name}`;
      console.log(path);
      this.afStor
        .upload(path, this.file)
        .snapshotChanges()
        .pipe(
          finalize(
            () => (this.photoURL = this.afStor.ref(path).getDownloadURL()),
          ),
        );
    }
  }
  onSubmit() {
    if (this.file) {
      this.uploadProfilePhoto();
    }
    this.photoURL.subscribe(photoURL => {
      if (this.new) {
        const newUser = new User(
          this.user.displayName,
          photoURL,
          this.user.uid,
          this.user.email,
          this.nickname.value,
        );
        this.userS.createUser(newUser);
      } else {
        this.userS.updateUserData({ nickname: this.nickname.value, photoURL });
      }
      return this.closeModal();
    });
  }

  get nickname() {
    return this.form.get('nickname');
  }
  get profileForm() {
    return this.form;
  }
}

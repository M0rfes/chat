import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { NicknameValidator } from '../util/nickname.validator';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { switchMap, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  @Input() new: boolean;
  @Input() user: User;
  form: FormGroup;
  photoURL: string;
  file: File;
  sub: Subscription;

  constructor(
    private modalCon: ModalController,
    private asf: AngularFirestore,
    private afStor: AngularFireStorage,
    private formB: FormBuilder,
    private userS: UserService,
  ) {}

  ngOnInit(): void {
    this.photoURL = this.user.photoURL;
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
    this.photoURL = uri;
  }
  onFile(file: File) {
    this.file = file;
  }
  closeModal() {
    this.modalCon.dismiss();
  }
  private uploadProfilePhoto() {
    const path = `profile/${this.user.displayName}`;
    console.log(path);
    return this.afStor
      .upload(path, this.file)
      .snapshotChanges()
      .pipe(
        finalize(() => {}),
        switchMap(() => this.afStor.ref(path).getDownloadURL()),
      );
  }
  onSubmit() {
    if (this.file) {
      this.sub = this.uploadProfilePhoto().subscribe(photoURL => {
        const newUser = new User(
          this.user.displayName,
          photoURL,
          this.user.uid,
          this.user.email,
          this.nickname.value,
        );
        this.submit(newUser).then(() => this.closeModal());
      });
    } else {
      const newUser = new User(
        this.user.displayName,
        this.photoURL,
        this.user.uid,
        this.user.email,
        this.nickname.value,
      );
      this.submit(newUser).then(() => this.closeModal());
    }
  }

  private submit(user: User) {
    if (this.new) {
      return this.userS.createUser(user);
    } else {
      this.sub = this.userS.updateUserData(user);
      return new Promise(res => res(null));
    }
  }

  get nickname() {
    return this.form.get('nickname');
  }
  get profileForm() {
    return this.form;
  }
  ngOnDestroy(): void {
    this.sub ? this.sub.unsubscribe() : null;
  }
}

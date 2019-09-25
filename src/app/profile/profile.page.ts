import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { NicknameValidator } from '../util/nickname.validator';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { switchMap, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FileUploadService } from '../service/file-upload.service';

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
    private LoadingCon: LoadingController,
    private fileUploadS: FileUploadService,
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
  async closeModal() {
    const modal = await this.modalCon.getTop();
    modal.dismiss();
  }
  private submit(user: User) {
    if (this.new) {
      return this.userS.createUser(user);
    } else {
      return this.userS.updateUserData(user);
    }
  }
  async onSubmit() {
    const path = `profile/${this.user.uid}`;
    const loading = await this.LoadingCon.create({
      message: 'uploading',
      duration: 2000,
    });
    loading.present();
    if (this.file) {
      this.sub = this.fileUploadS
        .upload(path, this.file)
        .subscribe(async photoURL => {
          const newUser = new User(
            this.user.displayName,
            photoURL,
            this.user.uid,
            this.user.email,
            this.nickname.value,
          );
          await this.submit(newUser);
          await loading.dismiss();
          await this.closeModal();
        });
    } else {
      const newUser = new User(
        this.user.displayName,
        this.photoURL,
        this.user.uid,
        this.user.email,
        this.nickname.value,
      );
      await this.submit(newUser);
      await loading.dismiss();
      await this.closeModal();
    }
  }

  get nickname() {
    return this.form.get('nickname');
  }
  get profileForm() {
    return this.form;
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

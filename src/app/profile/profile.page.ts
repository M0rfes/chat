import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { IsNewValidator } from '../util/isNew.validator';

import { AngularFirestore } from '@angular/fire/firestore';

import { Subscription } from 'rxjs';
import { FileUploadService } from '../service/file-upload.service';
import { take } from 'rxjs/operators';

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
    private formB: FormBuilder,
    private userS: UserService,
    private LoadingCon: LoadingController,
    private fileUploadS: FileUploadService,
  ) {}

  ngOnInit(): void {
    this.photoURL = this.user.photoURL;
    const nickNameVal = [
      [Validators.required, Validators.minLength(5), Validators.maxLength(25)],
      [
        IsNewValidator.field(
          this.asf,
          this.user,
          this.new,
          'users',
          'nickname',
        ),
      ],
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
  private async submit(user: User) {
    if (this.new) {
      return await this.userS.createUser(user);
    } else {
      return await this.userS.updateUserData(user);
    }
  }
  async onSubmit() {
    this.form.disable();
    const loading = await this.LoadingCon.create({
      message: 'uploading',
      duration: 5000,
    });
    loading.present();
    if (this.file) {
      const path = `profile/${this.user.uid}`;
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
      return;
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
      return;
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

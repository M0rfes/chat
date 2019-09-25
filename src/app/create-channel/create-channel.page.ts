import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from '../service/user.service';
import { FileUploadService } from '../service/file-upload.service';
import { NicknameValidator } from '../util/nickname.validator';
import { User } from '../models/user.model';
import { ChannelService } from '../service/channel.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.page.html',
  styleUrls: ['./create-channel.page.scss'],
})
export class CreateChannelPage implements OnInit, OnDestroy {
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
    private channelS: ChannelService,
    private LoadingCon: LoadingController,
    private fileUploadS: FileUploadService,
  ) {}

  ngOnInit(): void {
    this.channelS.test();

    // this.photoURL = this.user.photoURL;
    // const nameVal = [
    //   [Validators.required, Validators.minLength(5), Validators.maxLength(25)],
    //   [NicknameValidator.nickname(this.asf, this.user, this.new)],
    // ];
    // if (this.new) {
    //   this.form = this.formB.group({
    //     name: ['', ...nameVal],
    //     description: [''],
    //   });
    // } else {
    //   this.form = this.formB.group({
    //     name: ['', ...nameVal],
    //     description: [''],
    //   });
    // }
  }

  // onPreview(uri: string) {
  //   this.photoURL = uri;
  // }
  // onFile(file: File) {
  //   this.file = file;
  // }
  // async closeModal() {
  //   const modal = await this.modalCon.getTop();
  //   modal.dismiss();
  // }
  // private submit(user: User) {
  //   if (this.new) {
  //     return this.userS.createUser(user);
  //   } else {
  //     this.sub = this.userS.updateUserData(user);
  //     return new Promise(res => res(null));
  //   }
  // }
  // async onSubmit() {
  //   const path = `channel/${this.user.uid}`;
  //   const loading = await this.LoadingCon.create({
  //     message: 'uploading',
  //     duration: 2000,
  //   });
  //   loading.present();
  //   if (this.file) {
  //     this.sub = this.fileUploadS
  //       .upload(path, this.file)
  //       .subscribe(async photoURL => {
  //         const newUser = new User(
  //           this.user.displayName,
  //           photoURL,
  //           this.user.uid,
  //           this.user.email,
  //           this.nickname.value,
  //         );
  //         await this.submit(newUser);
  //         await loading.dismiss();
  //         await this.closeModal();
  //       });
  //   } else {
  //     const newUser = new User(
  //       this.user.displayName,
  //       this.photoURL,
  //       this.user.uid,
  //       this.user.email,
  //       this.nickname.value,
  //     );
  //     await this.submit(newUser);
  //     await loading.dismiss();
  //     await this.closeModal();
  //   }
  // }

  // get nickname() {
  //   return this.form.get('nickname');
  // }
  // get profileForm() {
  //   return this.form;
  // }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

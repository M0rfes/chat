import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { NicknameValidator } from '../util/nickname.validator';

import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Input() new: boolean;
  @Input() user: User;
  form: FormGroup;
  photoURL: string;
  file: File;
  constructor(
    private modalCon: ModalController,
    private asf: AngularFirestore,
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

  onFileChange({ target: { files } }: { target: { files: FileList } }) {
    this.file = files[0];
    const reader = new FileReader();
    reader.onload = event => {
      this.photoURL = (event.target as any).result;
    };
    reader.readAsDataURL(this.file);
  }

  closeModal() {
    this.modalCon.dismiss();
  }

  async onSubmit() {
    if (this.new) {
      const newUser = new User(
        this.user.displayName,
        this.user.photoURL,
        this.user.uid,
        this.user.email,
        this.nickname.value,
      );
      await this.userS.createUser(newUser);
    } else {
      await this.userS.updateUserData({ nickname: this.nickname.value });
    }
    return this.closeModal();
  }

  get nickname() {
    return this.form.get('nickname');
  }
  get profileForm() {
    return this.form;
  }
}

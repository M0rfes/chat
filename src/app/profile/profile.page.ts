import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AuthService } from '../auth/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  @Input() new: boolean;
  @Input() user: User;
  form: FormGroup;
  photoURL: string;
  file: File;
  constructor(
    private modalCon: ModalController,
    private authS: AuthService,
    private formB: FormBuilder,
    private userS: UserService,
  ) {}

  ionViewDidEnter() {
    this.photoURL = this.user.photoURL;
    if (this.new) {
      this.form = this.formB.group({
        nickname: '',
      });
    } else {
      this.form = this.formB.group({
        nickname: this.user.nickname,
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
}

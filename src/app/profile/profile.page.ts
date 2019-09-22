import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AuthService } from '../auth/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../models/user.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  form: FormGroup;
  user: User;
  photoURL: string;
  file: File;
  constructor(
    private modalCon: ModalController,
    private authS: AuthService,
    private formB: FormBuilder,
  ) {}

  ngOnInit() {
    this.authS.user.subscribe(user => {
      this.photoURL = user.photoURL;
      this.user = user;
    });
    this.form = this.formB.group({
      nickName: this.user ? this.user.nickName : '',
      file: this.user ? this.user.photoURL : '',
    });
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

  onSubmit() {
    console.log(this.form);
  }
}

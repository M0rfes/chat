import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: Observable<User>;
  constructor(private modalCon: ModalController, private authS: AuthService) {}

  ngOnInit() {
    this.user = this.authS.user as Observable<User>;
  }
  closeModal() {
    this.modalCon.dismiss();
  }
}

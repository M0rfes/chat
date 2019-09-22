import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavController, ModalController } from '@ionic/angular';
import { ProfilePage } from 'src/app/profile/profile.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(
    private authS: AuthService,
    private navCo: NavController,
    private modalCon: ModalController,
  ) {}

  async login() {
    await this.authS.googleLogin();
    const modal = await this.modalCon.create({
      component: ProfilePage,
    });
    await modal.present();
    this.navCo.navigateForward('/chat');
  }
}

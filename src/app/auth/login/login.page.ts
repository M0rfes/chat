import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavController, ModalController } from '@ionic/angular';
import { ProfilePage } from 'src/app/profile/profile.page';
import { UserService } from 'src/app/service/user.service';
import { async } from 'q';

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
    private userS: UserService,
  ) {}

  async login() {
    const { user } = await this.authS.googleLogin();
    this.userS.findOne(user.uid).subscribe(async u => {
      if (u) {
        this.navCo.navigateForward('/chat/channels');
      } else {
        const modal = await this.modalCon.create({
          component: ProfilePage,
          componentProps: {
            new: true,
            user,
          },
        });
        await modal.present();
        this.navCo.navigateForward('/chat/channels');
      }
    });
  }
}

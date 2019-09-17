import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(private authS: AuthService, private navCo: NavController) {}

  async login() {
    await this.authS.googleLogin();
    this.navCo.navigateForward('/chat');
  }
}

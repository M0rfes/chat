import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(private authS: AuthService, private navCon: NavController) {}

  ngOnInit() {
    this.authS.user.subscribe(user => {
      if (user) {
        this.navCon.navigateRoot('/chat/channels');
      }
    });
  }
}

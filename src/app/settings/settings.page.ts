import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  @Input() loadModal: () => Promise<void>;
  constructor(
    private popOverCon: PopoverController,
    private authS: AuthService,
  ) {}

  ngOnInit() {}
  loadProfileModal() {
    this.loadModal().then(_ => this.popOverCon.dismiss());
  }
  doLogout() {
    this.authS.signOut().then(() => {
      this.popOverCon.dismiss();
    });
  }
}

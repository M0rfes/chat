import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { SettingsPage } from '../settings/settings.page';

import { User } from '../models/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  title: 'contact' | 'channels' | 'favorites';
  private pages: ['contact', 'channels', 'favorites'] = [
    'contact',
    'channels',
    'favorites',
  ];
  user: User;
  constructor(
    private popCon: PopoverController,
    private navCon: NavController,
    private modalCon: ModalController,
    private userS: UserService,
  ) {}
  ngOnInit() {
    this.userS.user$.subscribe(user => (this.user = user));
  }
  change({ tab }: { tab: 'contact' | 'channels' | 'favorites' }) {
    this.title = tab;
  }
  async loadProfile(user: User) {
    const modal = await this.modalCon.create({
      component: ProfilePage,
      componentProps: {
        new: false,
        user,
      },
    });
    return modal.present();
  }
  async popUpSetting(event) {
    const popUp = await this.popCon.create({
      component: SettingsPage,
      event,
      componentProps: {
        loadModal: this.loadProfile.bind(this, this.user),
      },
    });
    return popUp.present();
  }
  handelSwipeLeft() {
    const currentPage = this.pages.indexOf(this.title);
    const nextPage = this.pages[currentPage + 1];
    if (nextPage) {
      return this.navCon.navigateForward(`chat/${nextPage}`);
    }
    return;
  }
  handelSwipeRight() {
    const currentPage = this.pages.indexOf(this.title);
    const nextPage = this.pages[currentPage - 1];
    if (nextPage) {
      return this.navCon.navigateForward(`chat/${nextPage}`);
    }
    return;
  }
}

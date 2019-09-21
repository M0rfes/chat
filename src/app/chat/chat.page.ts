import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { SettingsPage } from '../settings/settings.page';

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

  constructor(
    private popCon: PopoverController,
    private navCon: NavController,
    private modalCon: ModalController,
  ) {}
  ngOnInit() {}
  change({ tab }: { tab: 'contact' | 'channels' | 'favorites' }) {
    this.title = tab;
  }
  async loadProfile() {
    const modal = await this.modalCon.create({
      component: ProfilePage,
    });
    return modal.present();
  }
  async popUpSetting(event) {
    const popUp = await this.popCon.create({
      component: SettingsPage,
      event,
      componentProps: {
        loadModal: this.loadProfile.bind(this),
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

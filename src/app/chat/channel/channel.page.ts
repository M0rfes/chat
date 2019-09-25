import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalController } from '@ionic/angular';
import { CreateChannelPage } from 'src/app/create-channel/create-channel.page';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.page.html',
  styleUrls: ['./channel.page.scss'],
})
export class ChannelPage implements OnInit {
  constructor(public authS: AuthService, private modalCon: ModalController) {}

  ngOnInit() {}

  async onCreateNew() {
    const modal = await this.modalCon.create({
      id: 'newChannel',
      component: CreateChannelPage,
    });
    await modal.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalController } from '@ionic/angular';
import { CreateChannelPage } from 'src/app/create-channel/create-channel.page';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.page.html',
  styleUrls: ['./channel.page.scss'],
})
export class ChannelPage implements OnInit {
  user: User;
  constructor(
    public authS: AuthService,
    private modalCon: ModalController,
    private userS: UserService,
  ) {}

  ngOnInit() {
    this.userS.user$.subscribe(user => (this.user = user));
  }

  async onCreateNew() {
    const modal = await this.modalCon.create({
      id: 'newChannel',
      component: CreateChannelPage,
      componentProps: {
        new: true,
        user: this.user,
      },
    });
    await modal.present();
  }
}

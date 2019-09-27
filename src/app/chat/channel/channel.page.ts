import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalController } from '@ionic/angular';
import { CreateChannelPage } from 'src/app/create-channel/create-channel.page';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import { Subscription } from 'rxjs';
import { Channel } from 'src/app/models/channel.model';
import { ChannelService } from 'src/app/service/channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.page.html',
  styleUrls: ['./channel.page.scss'],
})
export class ChannelPage implements OnInit, OnDestroy {
  user: User;
  test = 'test';
  channel: Channel;
  channels: Channel[] = [];
  lastId = '';
  sub: Subscription;
  sub2: Subscription;
  constructor(
    public authS: AuthService,
    private modalCon: ModalController,
    private userS: UserService,
    private channelS: ChannelService,
  ) {}

  ngOnInit() {
    this.userS.user$.subscribe(user => (this.user = user));
    this.loadChannels().subscribe(channels => {
      console.log(channels, this.lastId);
      if (channels.length === 0) {
        return 0;
      } else {
        this.lastId = channels[channels.length - 1].uid;
        this.channels = channels;
      }
    });
  }
  loadChannels() {
    return this.channelS.getALL();
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
  handelSwipe() {}
}

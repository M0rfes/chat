import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/service/chat.service';
import { User } from 'src/app/models/user.model';
import { Chat } from 'src/app/models/chat.model';
import { PopoverController } from '@ionic/angular';
import { MessageSettingsPage } from 'src/app/message-settings/message-settings.page';
import { ChannelService } from 'src/app/service/channel.service';
import { Channel } from 'src/app/models/channel.model';
import { Subscription } from 'rxjs';
import { Msg } from 'src/app/models/msg.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit, OnDestroy {
  isFav: boolean;
  chatName: string;
  msg: string;
  user: User;
  chat: Chat;
  channel: Channel;
  private sub: Subscription;
  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  constructor(
    private userS: UserService,
    private activeRoute: ActivatedRoute,
    private chatS: ChatService,
    private popUpCon: PopoverController,
    private channelS: ChannelService,
  ) {}

  ngOnInit() {
    this.sub = this.activeRoute.params.subscribe(({ chatName }) => {
      this.chatName = chatName;
    });
    this.sub1 = this.chatS.chat$(this.chatName).subscribe(chat => {
      if (chat) {
        return (this.chat = chat);
      } else {
        return this.chatS.createChat(this.chatName);
      }
    });
    this.sub2 = this.userS.user$.subscribe(user => {
      const { favChats } = user;
      this.user = user;
      this.isFav = favChats.includes(this.chatName);
    });
    this.sub3 = this.channelS
      .channel$(this.chatName)
      .subscribe(channel => (this.channel = channel));
  }
  addToFva() {
    this.userS.addChatToFav(this.chatName);
  }
  onSend() {
    this.chatS
      .addMsg(
        [
          ...this.chat.msgs,
          { from: this.user.uid, msg: this.msg, photoURL: this.user.photoURL },
        ],
        this.chat.uid,
      )
      .then(() => {
        this.msg = '';
      });
  }
  onEnter($event) {
    console.log($event);
  }
  async presentMenu(event) {
    const menu = await this.popUpCon.create({
      component: MessageSettingsPage,
      event,
      id: 'messageSetting',
      componentProps: {
        isFav: this.isFav,
        addToFav: this.addToFva.bind(this),
        delete: () => this.channelS.delete(this.chatName),
        isOwner: this.channel ? this.channel.userId === this.user.uid : false,
      },
    });
    return await menu.present();
  }
  fromMe(msg: Msg) {
    return this.user.uid === msg.from;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
}

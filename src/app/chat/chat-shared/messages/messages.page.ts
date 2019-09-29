import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/service/chat.service';
import { User } from 'src/app/models/user.model';
import { Chat } from 'src/app/models/chat.model';
import { PopoverController } from '@ionic/angular';
import { MessageSettingsPage } from 'src/app/message-settings/message-settings.page';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  isFav: boolean;
  chatName: string;
  msg: string;
  user: User;
  chat: Chat;
  constructor(
    private userS: UserService,
    private activeRoute: ActivatedRoute,
    private chatS: ChatService,
    private popUpCon: PopoverController,
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(({ chatName }) => {
      this.chatName = chatName;
    });
    this.chatS.chat$(this.chatName).subscribe(chat => {
      this.chat = chat;
      console.log(this.chat);
    });
    this.userS.user$.subscribe(user => {
      const { favChats } = user;
      this.user = user;
      this.isFav = favChats.includes(this.chatName);
    });
  }
  addToFva(event: Event) {
    event.preventDefault();
    this.userS.addChatToFav(this.chatName);
  }
  onSend() {
    this.chatS
      .addMsg(
        [...this.chat.msgs, { from: this.user.uid, msg: this.msg }],
        this.chat.uid,
      )
      .then(() => {
        this.msg = '';
      });
  }
  async presentMenu(event) {
    const menu = await this.popUpCon.create({
      component: MessageSettingsPage,
      event,
      id: 'messageSetting',
    });
    return await menu.present();
  }
}

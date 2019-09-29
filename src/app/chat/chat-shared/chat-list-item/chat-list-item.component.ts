import { Component, OnInit, Input } from '@angular/core';
import { Channel } from 'src/app/models/channel.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss'],
})
export class ChatListItemComponent implements OnInit {
  @Input() data: Channel & User;
  user: User;
  url: string;
  name: string;
  constructor(private userS: UserService) {}

  ngOnInit() {
    this.name = this.data.email ? this.data.nickname : this.data.name;
  }
  handelSwipe() {}
}

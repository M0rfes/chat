import { Component, OnInit, Input } from '@angular/core';
import { Channel } from 'src/app/models/channel.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss'],
})
export class ChatListItemComponent implements OnInit {
  @Input() data: Channel & User;
  name: string;
  constructor() {}

  ngOnInit() {
    this.name = this.data.email ? this.data.nickname : this.data.name;
  }
}

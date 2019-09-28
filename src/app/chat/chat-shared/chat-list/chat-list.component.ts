import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Channel } from 'src/app/models/channel.model';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  @Input() data: User[] | Channel[];

  constructor() {}

  ngOnInit() {}

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
    }, 500);
  }
}

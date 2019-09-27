import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Channel } from 'src/app/models/channel.model';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  @Input() data: User[] | Channel[];
  @Output() loadData = new EventEmitter<{ target: IonInfiniteScroll }>();
  constructor() {}

  ngOnInit() {}
  _loadData($event) {
    this.loadData.emit($event);
  }
}

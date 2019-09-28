import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  isFav: boolean;
  chatName: string;
  constructor(
    private userS: UserService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(({ chatName }) => {
      this.chatName = chatName;
    });
    this.userS.user$.subscribe(
      ({ favChats }) => (this.isFav = favChats.includes(this.chatName)),
    );
  }
  addToFva(event: Event) {
    event.preventDefault();
    this.userS.addChatToFav(this.chatName);
  }
}

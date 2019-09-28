import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  constructor(
    private userS: UserService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {}
  addToFva() {
    this.activeRoute.params.subscribe(({ id }) => {
      this.userS.addChatToFav(id);
    });
  }
}

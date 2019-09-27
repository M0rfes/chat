import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {
  arry: number[];
  constructor(private userS: UserService) {}

  ngOnInit() {
    this.userS.getAll().subscribe(console.log);
    this.arry = new Array(1000);
  }
  handelSwipe() {}
}

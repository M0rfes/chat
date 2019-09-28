import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-skeleton',
  templateUrl: './chat-skeleton.component.html',
  styleUrls: ['./chat-skeleton.component.scss'],
})
export class ChatSkeletonComponent implements OnInit {
  array: number[];
  constructor() {}

  ngOnInit() {
    this.array = new Array(20);
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.db
      .collection('test')
      .valueChanges()
      .subscribe(console.log);
  }
}

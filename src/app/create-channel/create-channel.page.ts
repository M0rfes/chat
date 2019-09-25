import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.page.html',
  styleUrls: ['./create-channel.page.scss'],
})
export class CreateChannelPage implements OnInit {
  constructor(private modalCon: ModalController) {}

  ngOnInit() {}
  async closeModal() {
    const modal = await this.modalCon.getTop();
    modal.dismiss();
  }
}

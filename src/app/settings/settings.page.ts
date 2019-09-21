import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  @Input() loadModal: () => Promise<void>;
  constructor(private popOverCon: PopoverController) {}

  ngOnInit() {}
  loadProfileModal() {
    this.loadModal().then(_ => this.popOverCon.dismiss());
  }
}

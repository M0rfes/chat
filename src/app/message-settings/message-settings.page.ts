import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-message-settings',
  templateUrl: './message-settings.page.html',
  styleUrls: ['./message-settings.page.scss'],
})
export class MessageSettingsPage implements OnInit {
  @Input() isFav: boolean;
  @Input() addToFav: () => any;
  @Input() delete: () => any;
  @Input() isOwner: boolean;
  constructor(
    private popoverCon: PopoverController,
    private navCon: NavController,
  ) {}

  ngOnInit() {
    console.log(this.isFav);
  }
  onAddRemove() {
    this.addToFav();
    this.popoverCon.dismiss();
  }
  onDelete() {
    console.log(this.isFav);
    this.delete();
    this.popoverCon.dismiss().then(() => {
      this.navCon.pop();
    });
  }
}

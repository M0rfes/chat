import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatListItemComponent } from './chat-list-item/chat-list-item.component';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChatListComponent, ChatListItemComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [ChatListComponent, ChatListItemComponent],
})
export class ChatSharedModule {}

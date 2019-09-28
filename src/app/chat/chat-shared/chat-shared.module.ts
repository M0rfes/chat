import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatListItemComponent } from './chat-list-item/chat-list-item.component';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';
import { ChatSkeletonComponent } from './chat-skeleton/chat-skeleton.component';
import { PreviewDirective } from 'src/app/preview.directive';

@NgModule({
  declarations: [
    ChatListComponent,
    ChatListItemComponent,
    ChatSkeletonComponent,
    PreviewDirective,
  ],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [
    ChatListComponent,
    ChatListItemComponent,
    ChatSkeletonComponent,
    PreviewDirective,
  ],
})
export class ChatSharedModule {}

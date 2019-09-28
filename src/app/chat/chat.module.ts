import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ChatPage } from './chat.page';
import { SettingsPageModule } from '../settings/settings.module';

const routes: Routes = [
  {
    path: '',
    component: ChatPage,
    children: [
      {
        path: 'contact',
        children: [
          {
            path: '',
            loadChildren: './contact/contact.module#ContactPageModule',
          },
        ],
      },
      {
        path: 'channels',
        children: [
          {
            path: '',
            loadChildren: './channel/channel.module#ChannelPageModule',
          },
        ],
      },
      {
        path: 'favorites',
        children: [
          {
            path: '',
            loadChildren: './favourite/favourite.module#FavouritePageModule',
          },
        ],
      },
      { path: '', redirectTo: '/chat/channels', pathMatch: 'full' },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: '/chat/channels' },
  {
    path: ':id',
    loadChildren: './chat-shared/messages/messages.module#MessagesPageModule',
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ChatPage],
})
export class ChatPageModule {}

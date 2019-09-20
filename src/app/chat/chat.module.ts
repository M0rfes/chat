import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatPage } from './chat.page';

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
        path: 'channel',
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
      { path: '', redirectTo: '/chat/contact', pathMatch: 'full' },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: '/chat/tabs/contact' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ChatPage],
})
export class ChatPageModule {}

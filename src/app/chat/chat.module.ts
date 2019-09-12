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
      { path: '', redirectTo: 'channel', pathMatch: 'full' },
      {
        path: 'contact',
        loadChildren: './contact/contact.module#ContactPageModule',
      },
      {
        path: 'channel',
        loadChildren: './channel/channel.module#ChannelPageModule',
      },
      {
        path: 'favourite',
        loadChildren: './favourite/favourite.module#FavouritePageModule',
      },
    ],
  },
  { path: '**', redirectTo: '' },
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

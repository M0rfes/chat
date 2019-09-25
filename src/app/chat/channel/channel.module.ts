import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChannelPage } from './channel.page';
import { CreateChannelPageModule } from 'src/app/create-channel/create-channel.module';

const routes: Routes = [
  {
    path: '',
    component: ChannelPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ChannelPage],
})
export class ChannelPageModule {}

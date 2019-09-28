import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MessagesPage } from './messages.page';
import { ChatSharedModule } from '../chat-shared.module';

const routes: Routes = [
  {
    path: '',
    component: MessagesPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ChatSharedModule,
  ],
  declarations: [MessagesPage],
})
export class MessagesPageModule {}

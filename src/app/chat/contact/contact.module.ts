import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContactPage } from './contact.page';
import { ChatSharedModule } from '../chat-shared/chat-shared.module';

const routes: Routes = [
  {
    path: '',
    component: ContactPage,
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
  declarations: [ContactPage],
})
export class ContactPageModule {}

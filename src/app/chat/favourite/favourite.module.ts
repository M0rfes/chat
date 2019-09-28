import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FavouritePage } from './favourite.page';
import { ChatSharedModule } from '../chat-shared/chat-shared.module';

const routes: Routes = [
  {
    path: '',
    component: FavouritePage,
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
  declarations: [FavouritePage],
})
export class FavouritePageModule {}

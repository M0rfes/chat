import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateChannelPage } from './create-channel.page';
import { SharedModule } from '../shared/shared.module';
import { PreviewDirective } from '../preview.directive';

const routes: Routes = [
  {
    path: '',
    component: CreateChannelPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [CreateChannelPage],
})
export class CreateChannelPageModule {}

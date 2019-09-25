import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewDirective } from '../preview.directive';

@NgModule({
  declarations: [PreviewDirective],
  imports: [CommonModule],
  exports: [PreviewDirective],
})
export class SharedModule {}

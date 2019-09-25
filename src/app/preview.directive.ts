import {
  Directive,
  HostListener,
  EventEmitter,
  Output,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appPreview]',
})
export class PreviewDirective {
  @Output() preview = new EventEmitter<string>();
  @Output() file = new EventEmitter<File>();
  @HostListener('change', ['$event']) onchange({
    target: { files },
  }: {
    target: { files: FileList };
  }) {
    const file = files.item(0);
    this.file.emit(file);
    const reader = new FileReader();
    reader.onload = event => {
      this.preview.emit((event.target as any).result);
    };
    reader.readAsDataURL(file);
  }
  constructor(el: ElementRef) {}
}

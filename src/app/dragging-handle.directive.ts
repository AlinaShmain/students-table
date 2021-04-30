import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDraggingHandle]'
})
export class DraggingHandleDirective {

  constructor(public elementRef: ElementRef<HTMLElement>) { }

}

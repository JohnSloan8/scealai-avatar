import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appElastic]'
})
export class ElasticDirective {

  constructor(element: ElementRef) { 
    element.nativeElement.style.backgroundColor = '#ffffff'
  }

}

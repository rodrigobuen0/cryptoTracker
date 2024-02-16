import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {
  @Input() decimalPlaces: number = 2;

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const initialValue = this.el.nativeElement.value;
    const regex = new RegExp(`^[0-9]+(\.[0-9]{0,${this.decimalPlaces}})?$`);
    const newValue = initialValue.replace(/[^0-9.]/g, '');

    if (regex.test(newValue)) {
      this.el.nativeElement.value = newValue;
    } else {
      this.el.nativeElement.value = newValue.slice(0, -1);
    }

    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}

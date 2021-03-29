import {
  Directive,
  HostBinding,
  HostListener,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  // @HostListener('click') toggleMenu(eventData: Event) {
  //   this.isOpen = !this.isOpen;
  // this.renderer.addClass(this.elementRef.nativeElement, 'open');
  // }
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elementRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
}

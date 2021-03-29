import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  HostListener,
  HostBinding,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appTest]',
})
export class TestDirective implements OnInit {
  @Input() hoverColor: string = 'blue';
  @HostBinding('style.color') hoverTexto: string = 'black';
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  @HostListener('mouseenter') mouseEnterElement(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'blue');
    this.hoverTexto = this.hoverColor;
  }
  @HostListener('mouseleave') mouseLeaveElement(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black');
    this.hoverTexto = 'black';
  }
}

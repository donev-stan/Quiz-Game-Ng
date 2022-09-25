import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appTimer]',
})
export class TimerDirective implements OnChanges {
  @Input('value') timer!: number;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.timer < 15) {
      this.renderer.setStyle(this.elRef.nativeElement, 'color', '#F44336');
    } else if (this.timer < 35) {
      this.renderer.setStyle(this.elRef.nativeElement, 'color', '#FF5722');
    } else {
      this.renderer.setStyle(this.elRef.nativeElement, 'color', '#388E3C');
    }
  }
}

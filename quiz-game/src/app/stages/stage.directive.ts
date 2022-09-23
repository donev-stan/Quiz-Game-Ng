import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { QuestionsDataService } from '../shared/questions-data.service';

@Directive({
  selector: '[currentStage]',
})
export class StageDirective implements OnInit {
  @Input() stageIndex: number = 1;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private questionsService: QuestionsDataService
  ) {}

  ngOnInit() {
    this.questionsService.stageSubject.subscribe((stage) => {
      this.renderer.removeClass(this.elementRef.nativeElement, 'selected');

      if (stage === this.stageIndex) {
        this.renderer.addClass(this.elementRef.nativeElement, 'selected');
      }
    });
  }
}

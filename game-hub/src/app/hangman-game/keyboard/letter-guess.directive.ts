import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { RandomWordService } from '../services/random-word.service';

@Directive({
  selector: '[appLetterGuess]',
})
export class LetterGuessDirective {
  private word: any = [];
  @Input() letterClicked: string = '';

  constructor(
    private rndWordService: RandomWordService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.rndWordService.word.subscribe((word) => (this.word = word));
  }

  @HostListener('click') onLetterClick() {
    console.log('Im here');

    const foundLetter = this.word.find(
      (letter: any) => letter.name === this.letterClicked && !letter.guessed
    );

    if (foundLetter) {
      foundLetter.guessed = true;

      // this.renderer.setStyle(
      //   this.el.nativeElement,
      //   'background-color',
      //   'lightseagreen'
      // );
    } else {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        '#F44336'
      );
      this.renderer.setStyle(this.el.nativeElement, 'color', 'white');

      this.rndWordService.tries.next((this.rndWordService.triesCount -= 1));
      // wrong letter clicked => life -= 1
    }
  }
}

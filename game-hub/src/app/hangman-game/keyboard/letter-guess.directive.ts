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

  private disabledLetters: string[] = [];

  constructor(
    private rndWordService: RandomWordService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.rndWordService.word.subscribe((word) => (this.word = word));
  }

  @HostListener('click') onLetterClick() {
    const foundLetter = this.word.find(
      (letter: any) => letter.name === this.letterClicked && !letter.guessed
    );

    if (foundLetter) {
      foundLetter.guessed = true;
    } else {
      if (this.disabledLetters.includes(this.letterClicked)) return;
      this.disabledLetters.push(this.letterClicked);

      this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        '#F44336'
      );

      this.rndWordService.triesLeft -= 1;
      if (this.rndWordService.triesLeft <= 0) {
        // endgame
      }
      this.rndWordService.triesSubject.next(this.rndWordService.triesLeft);
    }
  }
}

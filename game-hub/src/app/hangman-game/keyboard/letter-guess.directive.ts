import { Dialog } from '@angular/cdk/dialog';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
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
    private renderer: Renderer2,
    public dialog: Dialog
  ) {}

  ngOnInit(): void {
    this.rndWordService.word.subscribe((word) => {
      this.word = word;
      this.renderer.setStyle(this.el.nativeElement, 'color', 'black');
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        'white'
      );
      this.disabledLetters = [];
    });
  }

  @HostListener('click') onLetterClick() {
    if (!this.word.length) return;
    if (this.rndWordService.triesLeft === 0) return;

    const foundLetter = this.word.find(
      (letter: any) => letter.name === this.letterClicked && !letter.guessed
    );

    if (foundLetter) {
      foundLetter.guessed = true;

      const stillToGuess = this.word.filter(
        (letter: any) => !letter.guessed
      ).length;

      if (!stillToGuess) {
        console.log(this.disabledLetters);

        this.disabledLetters.forEach((letter) => {
          console.log(letter);
        });

        // endgame --- WIN
        this.dialog.open(DialogComponent, {
          disableClose: true,
          data: {
            title: 'Congratulations!',
            text: `You have guessed the word.`,
            actions: {
              main: {
                text: 'Start Over',
                reset: true,
              },
              secondary: {
                text: 'Exit',
                exitGame: true,
              },
            },
          },
        });

        this.rndWordService.gameWon.next(true);
      }
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
        // endgame -- LOSE
        this.dialog.open(DialogComponent, {
          disableClose: true,
          data: {
            title: 'Game Over!',
            text: `Sorry, you were hanged.`,
            actions: {
              main: {
                text: 'Start Over',
                reset: true,
              },
              secondary: {
                text: 'Exit',
                exitGame: true,
              },
            },
          },
        });
      }
      this.rndWordService.triesSubject.next(this.rndWordService.triesLeft);
    }
  }
}

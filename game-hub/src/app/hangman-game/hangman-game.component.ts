import { Component, OnInit, Output } from '@angular/core';
import { RandomWordService } from './services/random-word.service';

@Component({
  selector: 'app-hangman-game',
  templateUrl: './hangman-game.component.html',
  styleUrls: ['./hangman-game.component.scss'],
})
export class HangmanGameComponent implements OnInit {
  hint: string = '';

  constructor(private rndWordService: RandomWordService) {
    this.rndWordService.hintSubject.subscribe((hint) => (this.hint = hint));
  }

  ngOnInit(): void {
    this.rndWordService.getRandomWord();
  }
}

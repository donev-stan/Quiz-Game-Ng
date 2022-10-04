import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../shared/guards/can-leave-game.guard';
import { RandomWordService } from './services/random-word.service';

@Component({
  selector: 'app-hangman-game',
  templateUrl: './hangman-game.component.html',
  styleUrls: ['./hangman-game.component.scss'],
})
export class HangmanGameComponent implements OnInit, CanComponentDeactivate {
  hint: string = '';
  canLeave: boolean = false;

  constructor(private rndWordService: RandomWordService) {
    this.rndWordService.hintSubject.subscribe((hint) => (this.hint = hint));
    this.rndWordService.canLeave.subscribe(
      (canLeave) => (this.canLeave = canLeave)
    );
  }

  ngOnInit(): void {
    this.rndWordService.getRandomWord();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.canLeave) return true;
    return confirm('Are you sure you want to leave this game?');
  }
}

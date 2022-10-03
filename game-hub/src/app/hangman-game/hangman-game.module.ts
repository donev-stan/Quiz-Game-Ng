import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HangmanGameComponent } from './hangman-game.component';
import { MaterialModule } from '../shared/material.module';
import { RoutingModule } from '../routing.module';
import { HangmanImgComponent } from './hangman-img/hangman-img.component';
import { WordComponent } from './word/word.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { LetterGuessDirective } from './keyboard/letter-guess.directive';

@NgModule({
  declarations: [
    HangmanGameComponent,
    HangmanImgComponent,
    WordComponent,
    KeyboardComponent,
    LetterGuessDirective,
  ],
  imports: [CommonModule, MaterialModule, RoutingModule],
})
export class HangmanGameModule {}

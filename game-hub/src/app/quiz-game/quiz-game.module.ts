import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizGameComponent } from './quiz-game.component';
import { TimerComponent } from './timer-and-hints/timer/timer.component';
import { HintsComponent } from './timer-and-hints/hints/hints.component';
import { TimerAndHintsComponent } from './timer-and-hints/timer-and-hints.component';
import { QuestionComponent } from './question/question.component';
import { StagesComponent } from './stages/stages.component';
import { GameOverDialogComponent } from './game-over-dialog/game-over-dialog.component';
import { MaterialModule } from '../shared/material.module';
import { RoutingModule } from '../routing.module';

@NgModule({
  declarations: [
    QuizGameComponent,
    TimerComponent,
    HintsComponent,
    TimerAndHintsComponent,
    QuestionComponent,
    StagesComponent,
    GameOverDialogComponent,
  ],
  imports: [CommonModule, MaterialModule, RoutingModule],
})
export class QuizGameModule {}

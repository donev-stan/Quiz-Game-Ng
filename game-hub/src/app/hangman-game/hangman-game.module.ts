import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HangmanGameComponent } from './hangman-game.component';
import { MaterialModule } from '../shared/material.module';
import { RoutingModule } from '../routing.module';

@NgModule({
  declarations: [HangmanGameComponent],
  imports: [CommonModule, MaterialModule, RoutingModule],
})
export class HangmanGameModule {}

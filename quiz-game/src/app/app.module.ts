import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HintsComponent } from './hints/hints.component';
import { StagesComponent } from './stages/stages.component';
import { MaterialModule } from './shared/material.module';
import { EndGameDialogComponent } from './shared/modal/end-game-dialog.component';
import { HeaderComponent } from './header/header.component';
import { TimerComponent } from './timer/timer.component';
import { TimerAndHintsComponent } from './quiz-game/timer-and-hints/timer-and-hints.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HintsComponent,
    StagesComponent,
    EndGameDialogComponent,
    HeaderComponent,
    TimerComponent,
    TimerAndHintsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

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

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HintsComponent,
    StagesComponent,
    EndGameDialogComponent,
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

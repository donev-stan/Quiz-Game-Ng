import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from './can-leave-game.guard';
import { DialogService } from './dialog/dialog.service';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.scss'],
})
export class QuizGameComponent implements CanComponentDeactivate {
  constructor(private dialogService: DialogService, private dialog: Dialog) {}

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return confirm('Are you sure you want to leave this game?');
  }
}

import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { QuestionsDataService } from '../services/questions-data.service';
import { IDialogData } from './dialogData';

@Component({
  selector: 'app-game-over-dialog',
  templateUrl: './game-over-dialog.component.html',
  styleUrls: ['./game-over-dialog.component.scss'],
})
export class GameOverDialogComponent {
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: IDialogData,
    private questionService: QuestionsDataService
  ) {}

  newGame() {
    this.questionService.reset();
    this.dialogRef.close();
  }
}

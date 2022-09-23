import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

import { IDialogData } from '../dialogData';
import { QuestionsDataService } from '../questions-data.service';

@Component({
  selector: 'end-game-dialog',
  templateUrl: './end-game-dialog.component.html',
  styleUrls: ['./end-game-dialog.component.scss'],
})
export class EndGameDialogComponent {
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

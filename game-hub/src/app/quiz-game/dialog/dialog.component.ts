import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsDataService } from '../services/questions-data.service';
import { IDialogData } from './dialogData';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: IDialogData,
    private questionService: QuestionsDataService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  btnClick(exitGame: boolean, reset: boolean): void {
    this.dialogRef.close();

    if (exitGame) {
      this.router.navigate(['/home']);
      this.questionService.destroyTimer();
    } else if (reset) {
      this.questionService.reset();
      this.questionService.destroyTimer();
    }
  }

  audienceResponseArray(data: any): any {
    return Object.entries(data);
  }
}

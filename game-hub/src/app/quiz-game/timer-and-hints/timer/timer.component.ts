import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../dialog/dialog.service';
import { QuestionsDataService } from '../../services/questions-data.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  timer: number = 59;

  constructor(
    private questionService: QuestionsDataService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.questionService.timerSubject.subscribe((time) => {
      this.timer = time;

      if (this.timer === 0) {
        this.dialogService.openDialog({
          title: 'Game Over',
          text: 'Sorry, you ran out of time!',
          actions: {
            main: {
              exitGame: false,
              reset: true,
              text: 'Start Over',
            },
            secondary: {
              exitGame: true,
              reset: false,
              text: 'Exit',
            },
          },
        });
      }
    });
  }
}

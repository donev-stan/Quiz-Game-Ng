import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { IDialogData } from '../shared/dialogData';
import { EndGameDialogComponent } from '../shared/modal/end-game-dialog.component';
import { IQuestion } from '../shared/question';
import { QuestionsDataService } from '../shared/questions-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  questions: IQuestion[] = [];
  answersClicked: number = 1;

  constructor(
    private questionsService: QuestionsDataService,
    public dialog: Dialog
  ) {}

  ngOnInit(): void {
    this.questionsService.questionSubject.subscribe(
      (questions: IQuestion[]) => {
        this.questions = questions;
        console.log(`Correct Answer: \n ${this.questions[0]?.correct_answer}`);
      }
    );
  }

  checkAnswer(answer: string, btn: any): void {
    if (this.answersClicked !== this.questionsService.stage) return;
    this.answersClicked++;

    const correctIsClicked = answer === this.questions[0].correct_answer;

    if (correctIsClicked) {
      btn.color = 'success';

      if (this.questionsService.stage === 15) {
        this.openDialog({
          title: 'Congratulations!',
          text: 'You won the top price.',
          winnings: this.questionsService.getWinnings(),
        });
      }

      setTimeout(() => {
        this.questionsService.nextStage();
        btn.color = '';

        console.log(`Correct Answer: \n ${this.questions[0]?.correct_answer}`);
      }, 500);
    } else {
      btn.color = 'warn';
      this.answersClicked = 1;

      this.openDialog({
        title: 'Game Over',
        text: 'Sorry, wrong answer.',
        winnings: this.questionsService.getWinnings(),
      });
    }
  }

  openDialog(data: IDialogData) {
    this.dialog.open(EndGameDialogComponent, {
      disableClose: true,
      data,
    });
  }
}

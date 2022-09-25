import { Dialog } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDialogData } from '../game-over-dialog/dialogData';
import { GameOverDialogComponent } from '../game-over-dialog/game-over-dialog.component';
import { QuestionsDataService } from '../services/questions-data.service';
import { IQuestion } from './question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  questions: IQuestion[] = [];
  answersClicked: number = 1;

  questionsSubscription: Subscription = new Subscription();

  constructor(
    private questionsService: QuestionsDataService,
    public dialog: Dialog
  ) {}

  ngOnInit(): void {
    this.questionsService.createSubscription();

    this.questionsSubscription =
      this.questionsService.questionSubject.subscribe(
        (questions: IQuestion[]) => {
          this.questions = questions;
          console.log(
            `Correct Answer: \n ${this.questions[0]?.correct_answer}`
          );
        }
      );
  }

  ngOnDestroy(): void {
    this.questionsSubscription.unsubscribe();
    this.questionsService.terminate();
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
          action: {
            exitGame: false,
            text: 'Start Over',
          },
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
        action: {
          exitGame: false,
          text: 'Start Over',
        },
      });
    }
  }

  openDialog(data: IDialogData) {
    this.dialog.open(GameOverDialogComponent, {
      disableClose: true,
      data,
    });
  }
}

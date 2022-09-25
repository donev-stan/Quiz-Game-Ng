import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogService } from '../dialog/dialog.service';
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
    private dialogService: DialogService
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

          this.questionsService.startTimer();
        }
      );
  }

  ngOnDestroy(): void {
    this.questionsSubscription.unsubscribe();
    this.questionsService.terminate();
    this.questionsService.destroyTimer();
  }

  checkAnswer(answer: string, btn: any): void {
    if (this.answersClicked !== this.questionsService.stage) return;
    this.answersClicked++;

    const correctIsClicked = answer === this.questions[0].correct_answer;

    if (correctIsClicked) {
      btn.color = 'success';

      if (this.questionsService.stage === 15) {
        this.dialogService.openDialog({
          title: 'Congratulations!',
          text: 'You won the top price.',
          winnings: this.questionsService.getWinnings(),
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

      setTimeout(() => {
        this.questionsService.nextStage();
        btn.color = '';

        console.log(`Correct Answer: \n ${this.questions[0]?.correct_answer}`);
      }, 500);
    } else {
      btn.color = 'warn';
      this.answersClicked = 1;

      this.questionsService.destroyTimer();
      this.dialogService.openDialog({
        title: 'Game Over',
        text: 'Sorry, wrong answer.',
        winnings: this.questionsService.getWinnings(),
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
  }
}

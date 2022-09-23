import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../shared/question';
import { QuestionsDataService } from '../shared/questions-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  questions!: IQuestion[];

  disabledBtns: boolean = false;

  constructor(private questionsService: QuestionsDataService) {}

  ngOnInit(): void {
    this.questionsService.questionSubject.subscribe(
      (questions: IQuestion[]) => {
        this.questions = questions;
      }
    );
  }

  checkAnswer(answer: string, btn: any): void {
    // this.disabledBtns = true;

    const correctIsClicked = answer === this.questions[0].correct_answer;

    this.questionsService.nextStage();

    if (correctIsClicked) {
      // this.questionsService.nextStage();
    }

    // this.disabledBtns = false;
    console.log(this.questions);
  }
}

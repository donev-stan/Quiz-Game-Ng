import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { FetchQuestionsService } from './fetch-questions.service';
import { IQuestion } from './question';

@Injectable({
  providedIn: 'root',
})
export class QuestionsDataService {
  questions: IQuestion[] = [];
  questionSubject: Subject<IQuestion[]> = new Subject();
  questionsSubscription: Subscription;

  stage: number = 1;
  stageSubject: Subject<number> = new Subject();

  hints: string[] = ['50/50', 'Friend', 'Audience'];
  hintsSubject: Subject<string[]> = new Subject();

  gameStages: any = {
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
    6: 1000,
    7: 1500,
    8: 2000,
    9: 3000,
    10: 5000,
    11: 10000,
    12: 20000,
    13: 30000,
    14: 50000,
    15: 100000,
  };

  constructor(private fetchQuestionsService: FetchQuestionsService) {
    this.questionsSubscription = this.subscribeToQuestions();
  }

  subscribeToQuestions(): Subscription {
    return this.fetchQuestionsService
      .fetchQuestions()
      .subscribe((data: IQuestion[]) => {
        this.questions.push(...data);
        this.questionSubject.next(this.questions);

        this.hintsSubject.next(this.hints);
        this.stageSubject.next(this.stage);
      });
  }

  nextStage(): void {
    if (this.stage === 15) return;

    this.stage++;
    this.stageSubject.next(this.stage);
    this.questions.shift();

    if (this.stage === 4 || this.stage === 9) {
      this.questionsSubscription.unsubscribe();
      this.questionsSubscription = this.subscribeToQuestions();
    }
  }

  getWinnings(): number {
    switch (this.stage) {
      case 1:
        return 0;

      case 15:
        return this.gameStages[this.stage];

      default:
        return this.gameStages[this.stage - 1];
    }
  }

  reset(): void {
    this.questions = [];
    this.questionSubject.next(this.questions);

    this.hints = ['50/50', 'Friend', 'Audience'];
    this.hintsSubject.next(this.hints);

    this.stage = 1;
    this.stageSubject.next(this.stage);

    this.fetchQuestionsService.resetDificultyStages();
    this.questionsSubscription.unsubscribe();
    this.questionsSubscription = this.subscribeToQuestions();
  }

  fiftyFiftyHint(): void {
    if (!this.hints.includes('50/50')) return;
    this.hints.splice(this.hints.indexOf('50/50'), 1);
    this.hintsSubject.next(this.hints);

    const current_question = this.questions[0];

    while (current_question.answers.length > 2) {
      const correct_answer_index = current_question.answers.indexOf(
        current_question.correct_answer
      );

      const rndIndex = Math.floor(Math.random() * 4);

      if (rndIndex !== correct_answer_index) {
        current_question.answers.splice(rndIndex, 1);
      }
    }
  }

  friendHint(): void {
    if (!this.hints.includes('Friend')) return;
    this.hints.splice(this.hints.indexOf('Friend'), 1);
    this.hintsSubject.next(this.hints);

    const current_question = this.questions[0];
  }

  audienceHint(): void {
    if (!this.hints.includes('Audience')) return;
    this.hints.splice(this.hints.indexOf('Audience'), 1);
    this.hintsSubject.next(this.hints);

    const current_question = this.questions[0];
  }
}

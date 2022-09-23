import { Injectable, SimpleChanges } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

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
    this.stage = 1;
    this.stageSubject.next(this.stage);
    this.fetchQuestionsService.resetDificultyStages();
    this.questionsSubscription.unsubscribe();
    this.questionsSubscription = this.subscribeToQuestions();
  }
}

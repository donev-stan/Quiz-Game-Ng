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
}

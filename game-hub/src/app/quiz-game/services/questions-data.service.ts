import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { IQuestion } from '../question/question';

import { FetchQuestionsService } from './fetch-questions.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionsDataService {
  questions: IQuestion[] = [];
  questionSubject: Subject<IQuestion[]> = new Subject();
  questionsSubscription!: Subscription;

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
    this.createSubscription();
  }

  createSubscription(): void {
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

        this.fetchQuestionsService.shiftQuestionDifficulty();
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
    this.terminate();
    this.questionSubject.next(this.questions);
    this.createSubscription();
  }

  terminate(): void {
    this.questions = [];

    this.hints = ['50/50', 'Friend', 'Audience'];
    this.hintsSubject.next(this.hints);

    this.stage = 1;
    this.stageSubject.next(this.stage);

    this.fetchQuestionsService.resetDificultyStages();
    this.questionsSubscription.unsubscribe();
  }

  canUseHint(hintName: string): boolean {
    if (!this.hints.includes(hintName)) return false;

    this.hints.splice(this.hints.indexOf(hintName), 1);
    this.hintsSubject.next(this.hints);

    return true;
  }

  fiftyFiftyHint(): void {
    const canUse = this.canUseHint('50/50');
    if (!canUse) return;

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
    const canUse = this.canUseHint('Friend');
    if (!canUse) return;

    const current_question = this.questions[0];
  }

  audienceHint(): void {
    const canUse = this.canUseHint('Audience');
    if (!canUse) return;

    const current_question = this.questions[0];
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { IQuestion } from '../question/question';

@Injectable({
  providedIn: 'root',
})
export class FetchQuestionsService {
  private BASE_URL = 'https://opentdb.com/api.php';

  private questionsDifficulty: string[] = ['easy', 'medium', 'hard'];

  constructor(private http: HttpClient) {}

  shiftQuestionDifficulty(): void {
    this.questionsDifficulty.shift();
  }

  resetDificultyStages(): void {
    this.questionsDifficulty = ['easy', 'medium', 'hard'];
  }

  fetchQuestions(): Observable<IQuestion[]> {
    return this.http
      .get<any>(
        `${this.BASE_URL}?amount=5&difficulty=${this.questionsDifficulty[0]}&type=multiple`
      )
      .pipe(
        map((data) => {
          return data.results.map((questionData: any) => ({
            question: questionData.question,
            answers: [
              ...questionData.incorrect_answers,
              questionData.correct_answer,
            ].sort(),
            correct_answer: questionData.correct_answer,
          }));
        }),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }

    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}

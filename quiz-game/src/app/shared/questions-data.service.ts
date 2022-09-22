import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsDataService {
  private BASE_URL = 'https://opentdb.com/api.php';

  private questionsDifficulty: string[] = ['easy', 'medium', 'hard'];

  constructor(private http: HttpClient) {}

  shiftQuestionDifficulty(): void {
    this.questionsDifficulty.shift();
  }

  getQuestions(): Observable<any> {
    return this.http
      .get<any>(
        `${this.BASE_URL}?amount=5&difficulty=${this.questionsDifficulty[0]}&type=multiple`
      )
      .pipe(
        tap((data) => console.log(data.results)),
        map((data) => data.results),
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

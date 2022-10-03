import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RandomWordService {
  private baseUrl: string =
    'https://random-words-with-pronunciation.p.rapidapi.com/word';

  private headers = new HttpHeaders()
    .set('X-RapidAPI-Key', '3ddf8e2012mshaa0ad9dbe4c09d3p1f1ed0jsnbc4ddc25afa7')
    .set('X-RapidAPI-Host', 'random-words-with-pronunciation.p.rapidapi.com');

  word: Subject<any> = new Subject();

  triesLeft: number = 10;
  triesSubject: Subject<number> = new Subject();

  hint: string = '';
  hintSubject: Subject<string> = new Subject();

  constructor(private http: HttpClient) {}

  getRandomWord(): void {
    // this.http
    //   .get(this.baseUrl, {
    //     headers: this.headers,
    //   })
    //   .pipe(
    //     tap((dataArr: any) => (this.hint = dataArr[0].definition)),
    //     map((data: any) =>
    //       data.flatMap((wordData: any) =>
    //         wordData.word
    //           .split('')
    //           .map((letter: string) => ({ name: letter.toLowerCase(), guessed: false }))
    //       )
    //     ),
    //     tap((res) => console.log(res))
    //   )
    //   .subscribe((word: []) => {
    //     this.word.next(word);
    //     this.tries.next(10);
    //     console.log(this.hint);
    //   });

    this.triesLeft = 10;
    this.triesSubject.next(this.triesLeft);

    this.hint = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';
    this.hintSubject.next(this.hint);

    this.word.next([
      { name: 'I', guessed: false },
      { name: 's', guessed: false },
      { name: 'o', guessed: false },
      { name: 'c', guessed: false },
      { name: 'h', guessed: false },
      { name: 'e', guessed: false },
      { name: 'i', guessed: false },
      { name: 'm', guessed: false },
    ]);
  }
}

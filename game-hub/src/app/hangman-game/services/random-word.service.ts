import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RandomWordService {
  // private baseUrl: string =
  //   'https://random-words5.p.rapidapi.com/getMultipleRandom?count=1';

  private baseUrl: string =
    'https://random-words-with-pronunciation.p.rapidapi.com/word';

  // private headers = new HttpHeaders()
  //   .set('X-RapidAPI-Key', '3ddf8e2012mshaa0ad9dbe4c09d3p1f1ed0jsnbc4ddc25afa7')
  //   .set('X-RapidAPI-Host', 'random-words5.p.rapidapi.com');

  private headers = new HttpHeaders()
    .set('X-RapidAPI-Key', '3ddf8e2012mshaa0ad9dbe4c09d3p1f1ed0jsnbc4ddc25afa7')
    .set('X-RapidAPI-Host', 'random-words-with-pronunciation.p.rapidapi.com');

  word: Subject<any> = new Subject();

  triesCount: number = 10;
  tries: Subject<number> = new Subject();

  hint: string = '';

  constructor(private http: HttpClient) {}

  getRandomWord(): void {
    // this.http
    //   .get(this.baseUrl, {
    //     headers: this.headers,
    //   })
    //   .pipe(
    //     map((wordArr: any) =>
    //       wordArr.flatMap((word: string) =>
    //         word
    //           .split('')
    //           .map((letter: string) => ({ name: letter, guessed: false }))
    //       )
    //     )
    //   )
    //   .subscribe((word: []) => {
    //     this.word.next(word);
    //     this.tries.next(10);
    //   });

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

    this.tries.next(10);
  }
}

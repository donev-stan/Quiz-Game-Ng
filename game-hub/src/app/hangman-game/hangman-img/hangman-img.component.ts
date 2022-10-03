import { Component, OnInit } from '@angular/core';
import { RandomWordService } from '../services/random-word.service';

@Component({
  selector: 'app-hangman-img',
  templateUrl: './hangman-img.component.html',
  styleUrls: ['./hangman-img.component.scss'],
})
export class HangmanImgComponent implements OnInit {
  tries: number = 10;

  constructor(private rndWordService: RandomWordService) {}

  ngOnInit(): void {
    this.rndWordService.tries.subscribe(
      (triesCount) => (this.tries = triesCount)
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { RandomWordService } from '../services/random-word.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class WordComponent implements OnInit {
  @Input() word: any = [
    { name: 'i', guessed: false },
    { name: 's', guessed: false },
    { name: 'o', guessed: false },
    { name: 'c', guessed: false },
    { name: 'h', guessed: false },
    { name: 'e', guessed: false },
    { name: 'i', guessed: false },
    { name: 'm', guessed: false },
  ];

  constructor(private rndWordService: RandomWordService) {}

  ngOnInit(): void {
    this.rndWordService.word.subscribe((word) => {
      console.log(word);
      this.word = word;
    });
  }
}

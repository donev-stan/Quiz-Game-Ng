import { Component, OnInit } from '@angular/core';
import { RandomWordService } from '../services/random-word.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class WordComponent implements OnInit {
  word: any = [];

  constructor(private rndWordService: RandomWordService) {}

  ngOnInit(): void {
    this.rndWordService.word.subscribe((word) => {
      this.word = word;
    });
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.scss'],
})
export class StagesComponent implements OnInit {
  gameStages = {
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

  constructor() {}

  ngOnInit(): void {}

  stageWinningsArray(): any {
    // console.log(Object.entries(this.gameStages));
    return Object.values(this.gameStages).reverse();

    return [];
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  users = [
    {
      name: 'Stan',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Vasil',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Stoqn',
      updated: new Date('1/28/16'),
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

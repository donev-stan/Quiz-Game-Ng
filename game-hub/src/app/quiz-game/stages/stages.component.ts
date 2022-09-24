import { Component, OnInit } from '@angular/core';
import { QuestionsDataService } from '../services/questions-data.service';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.scss'],
})
export class StagesComponent implements OnInit {
  currentStage: number = 1;

  constructor(private questionService: QuestionsDataService) {}

  ngOnInit(): void {
    this.questionService.stageSubject.subscribe((stage) => {
      this.currentStage = stage;
    });
  }

  stageWinningsArray(): any {
    return Object.entries(this.questionService.gameStages).reverse();
  }
}

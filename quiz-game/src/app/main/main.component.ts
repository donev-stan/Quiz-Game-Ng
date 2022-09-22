import { Component, OnInit } from '@angular/core';
import { QuestionsDataService } from '../shared/questions-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private questionsService: QuestionsDataService) {}

  ngOnInit(): void {
    this.questionsService.getQuestions().subscribe((questions) => {
      console.log(questions);
    });
  }
}

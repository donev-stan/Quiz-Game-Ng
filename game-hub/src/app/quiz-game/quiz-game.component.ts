import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from './can-leave-game.guard';
import { DialogService } from './dialog/dialog.service';
import { QuestionsDataService } from './services/questions-data.service';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.scss'],
})
export class QuizGameComponent implements OnInit, CanComponentDeactivate {
  canLeave: boolean = false;

  constructor(private questionsService: QuestionsDataService) {}

  ngOnInit(): void {
    this.questionsService.canLeaveGameSubject.subscribe((canLeave) => {
      this.canLeave = canLeave;
      console.log(canLeave);
      console.log(this.canLeave);
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.canLeave) return true;

    return confirm('Are you sure you want to leave this game?');
  }
}

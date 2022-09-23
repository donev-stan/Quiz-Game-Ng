import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuestionsDataService } from '../shared/questions-data.service';

@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.scss'],
})
export class HintsComponent implements OnInit {
  // @ViewChild('btn50/50') fiftyFiftyBtn: ElementRef;

  availableHints: string[] = [];

  constructor(private questionService: QuestionsDataService) {}

  ngOnInit(): void {
    this.questionService.hintsSubject.subscribe((hints: string[]) => {
      this.availableHints = hints;
      console.log(this.availableHints);
    });
  }

  activateHint(hint: string, btn: any) {
    switch (hint) {
      case '50/50':
        this.questionService.fiftyFiftyHint();
        btn.color = 'warn';

        break;

      case 'audience':
        this.questionService.audienceHint();
        btn.color = 'warn';

        break;

      case 'friend':
        this.questionService.friendHint();
        btn.color = 'warn';

        break;
    }
  }
}

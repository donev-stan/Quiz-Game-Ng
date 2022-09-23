import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { QuestionsDataService } from '../shared/questions-data.service';

@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.scss'],
})
export class HintsComponent implements OnInit, AfterViewInit {
  availableHints: string[] = [];

  @ViewChild('btn50') fiftyFiftyBtn: any;
  @ViewChild('btnAudience') audienceBtn: any;
  @ViewChild('btnFriend') friendBtn: any;

  constructor(private questionService: QuestionsDataService) {}

  ngOnInit(): void {
    this.questionService.hintsSubject.subscribe((hints: string[]) => {
      this.availableHints = hints;
      console.log(this.availableHints);

      this.setHintBtnColors();
    });
  }

  ngAfterViewInit(): void {
    console.log(this.fiftyFiftyBtn);
    console.log(this.audienceBtn);
    console.log(this.friendBtn);
  }

  activateHint(hint: string, btn: MatButton) {
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

  setHintBtnColors(): void {
    if (this.availableHints.includes('50/50'))
      this.fiftyFiftyBtn.color = 'primary';

    if (this.availableHints.includes('Audience')) {
      console.log('HERE!!!');

      this.audienceBtn.color = 'primary';
    }

    if (this.availableHints.includes('Friend'))
      this.friendBtn.color = 'primary';
  }
}

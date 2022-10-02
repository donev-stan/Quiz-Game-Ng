import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '../../dialog/dialog.service';
import { QuestionsDataService } from '../../services/questions-data.service';

@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.scss'],
})
export class HintsComponent implements OnInit {
  availableHints: string[] = [];

  @ViewChild('btn50') fiftyFiftyBtn: any;
  @ViewChild('btnAudience') audienceBtn: any;
  @ViewChild('btnFriend') friendBtn: any;

  constructor(
    private questionService: QuestionsDataService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.questionService.hintsSubject.subscribe((hints: string[]) => {
      this.availableHints = hints;
      this.setHintBtnColors();
    });
  }

  ngAfterViewInit(): void {
    // console.log(this.fiftyFiftyBtn);
    // console.log(this.audienceBtn);
    // console.log(this.friendBtn);
  }

  activateHint(hint: string) {
    switch (hint) {
      case '50/50': {
        this.questionService.fiftyFiftyHint();
        break;
      }

      case 'Audience': {
        const response = this.questionService.audienceHint();
        if (response) {
          this.dialogService.openDialog({
            title: 'Ask The Audience',
            text: ``,
            audienceResponse: response,
            actions: {
              main: {
                exitGame: false,
                reset: false,
                text: 'Thanks!',
              },
            },
          });
        }
        break;
      }

      case 'Friend': {
        const response = this.questionService.friendHint();
        if (response) {
          this.dialogService.openDialog({
            title: 'Call A Friend',
            text: response.toString(),
            actions: {
              main: {
                exitGame: false,
                reset: false,
                text: 'Thanks!',
              },
            },
          });
        }
        break;
      }
    }
  }

  setHintBtnColors(): void {
    this.availableHints.includes('50/50')
      ? (this.fiftyFiftyBtn.color = 'primary')
      : (this.fiftyFiftyBtn.color = 'warn');

    this.availableHints.includes('Audience')
      ? (this.audienceBtn.color = 'primary')
      : (this.audienceBtn.color = 'warn');

    this.availableHints.includes('Friend')
      ? (this.friendBtn.color = 'primary')
      : (this.friendBtn.color = 'warn');
  }
}

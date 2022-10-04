import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RandomWordService } from '../services/random-word.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any,
    private router: Router,
    private rndWordService: RandomWordService
  ) {}

  ngOnInit(): void {}

  btnClick(exitGame?: boolean, reset?: boolean): void {
    this.rndWordService.canLeave.next(true);
    this.dialogRef.close();

    if (exitGame) {
      this.router.navigate(['/home']);
    } else if (reset) {
      this.rndWordService.getRandomWord();
    }
  }
}

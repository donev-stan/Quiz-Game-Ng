import { Dialog } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { IDialogData } from './dialogData';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: Dialog) {}

  openDialog(dialogData: IDialogData): any {
    this.dialog.closeAll();

    this.dialog.open(DialogComponent, {
      disableClose: true,
      data: dialogData,
    });
  }
}

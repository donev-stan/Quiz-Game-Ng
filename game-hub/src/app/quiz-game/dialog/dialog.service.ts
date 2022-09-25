import { Dialog } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { IDialogData } from './dialogData';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: Dialog) {}

  openDialog(dialogData: IDialogData) {
    this.dialog.open(DialogComponent, { disableClose: true, data: dialogData });
  }
}

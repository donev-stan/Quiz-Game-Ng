import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

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
    private firebase: FirebaseService
  ) {}

  ngOnInit(): void {}

  btnClick(action: string, deleteId?: string): void {
    const route = () => {
      this.dialogRef.close();
      this.firebase.logout();
      this.router.navigate(['/home']);
    };

    if (action === 'logout') route();

    if (action === 'delete') {
      this.firebase.deleteUser(deleteId!).then((data) => {
        if (data) {
          route();
        }
      });
    }

    this.dialogRef.close();
  }
}

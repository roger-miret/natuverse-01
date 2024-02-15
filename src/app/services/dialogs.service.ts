import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { ConfirmDialogModel, ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {
  dialog=inject(MatDialog);

  openConfirmModal(message:string, dialogText:string): Observable<boolean>{
    const dialogData = new ConfirmDialogModel(dialogText, message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    return dialogRef.afterClosed().pipe(tap(dialogResult => {
      console.log(dialogResult);
      alert(dialogResult);
    }));
  }

  constructor() { }
}

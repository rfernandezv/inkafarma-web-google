import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BlockUI, NgBlockUI } from 'ng-block-ui';
import {Component, Inject} from '@angular/core';
import {messageNotification} from './models/messageNotification';

@Component({
  selector: 'app-popup.dialog',
  templateUrl: './popup.dialog.html',
  styleUrls: ['./popup.dialog.css']
})
export class PopupDialogComponent {
  @BlockUI() blockUI: NgBlockUI;

  constructor(public dialogRef: MatDialogRef<PopupDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: messageNotification) { }

  onNoClick(): void {
    this.dialogRef.close('x');
  }

}

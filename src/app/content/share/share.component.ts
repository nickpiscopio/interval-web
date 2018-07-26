import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.sass']
})
export class ShareComponent {
  private dialogRef: MatDialogRef<ShareComponent>;

  private url: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { url: string },
              dialogRef: MatDialogRef<ShareComponent>,
              private dialog: MatDialog) {

    this.dialogRef = dialogRef;

    this.url = data.url;
  }
}

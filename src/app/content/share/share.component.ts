import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import { Timer } from '../timer/timer';
import { Route } from '../../constant/route.constant';

const MESSAGE_COPY = "URL copied to clipboard!";
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.sass']
})
export class ShareComponent {
  private dialogRef: MatDialogRef<ShareComponent>;

  private timer: Timer;

  private url: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { timer: Timer },
              dialogRef: MatDialogRef<ShareComponent>,
              private snackBar: MatSnackBar) {

    this.dialogRef = dialogRef;

    this.timer = data.timer;

    this.getUrl()
  }

  /**
   * Gets the url to share.
   */
  getUrl() {
    let timer = JSON.stringify(this.timer);

    this.url = Route.DOMAIN + Route.getTimerRoute(timer, true)
  }

  /**
   * Shows the URL was copied in a snackbar.
   * The actual copying takes place in ngx-clipboard in the html.
   */
  copyUrl() {
    this.snackBar.open(MESSAGE_COPY, null, { 
      duration: 2000
    });
  }
}

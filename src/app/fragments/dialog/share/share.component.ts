import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import { Timer } from '../../content/timer/timer';
import { Route } from '../../../constant/route.constant';
import {ApiUtility} from '../../../utility/api.utility';
import {HttpClient} from '@angular/common/http';
import {fade} from '../../../animations/fade';

const MESSAGE_COPY = 'URL copied to clipboard!';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.sass'],
  animations: [fade]
})
export class ShareComponent {
  // Boolean value to determine if we are getting the URL or not.
  isLoading = false;

  showProgress = true;
  centered = true;

  message: string;

  timer: Timer;

  url: string;

  private dialogRef: MatDialogRef<ShareComponent>;

  private apiUtility: ApiUtility;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { timer: Timer, message: string },
              dialogRef: MatDialogRef<ShareComponent>,
              private snackBar: MatSnackBar,
              private http: HttpClient) {

    this.dialogRef = dialogRef;

    this.timer = data.timer;

    this.message = data.message;

    this.apiUtility = new ApiUtility(http);

    this.getUrl();
  }

  /**
   * Gets the url to share.
   */
  getUrl() {
    this.isLoading = true;

    this.url = this.buildUrl(encodeURI(JSON.stringify(this.timer)));

    this.apiUtility.storeTimer(this.timer, (data) => {
      if (data !== undefined) {
        const id = data.id;
        if (id !== undefined) {
          this.url = this.buildUrl(id);
        }
      }

      this.isLoading = false;
    });
  }

  /**
   * Builds the URL from the timer.
   *
   * @param timer   A string representation of either the timer or its ID.
   */
  buildUrl(timer: string) {
    return Route.DOMAIN + Route.getTimerRoute(timer, false);
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

  /**
   * Returns whether or not to show the message inside the share dialog.
   */
  showMessage() {
    return this.message !== undefined && this.message.length > 0;
  }

  /**
   * Gets the Twitter URL.
   *
   * @return The URL to share on Twitter.
   */
  getTwitterUrl() {
    return 'https://twitter.com/intent/tweet?hashtags=Interval,HIIT,Fitness,App&original_referer=https%3A%2F%2Fpublish.twitter.com%2F&ref_src=twsrc%5Etfw&url=' + this.url;
  }

  /**
   * Gets the Facebook URL.
   *
   * @return The URL to share on Facebook.
   */
  getFacebookUrl() {
    return 'https://www.facebook.com/sharer/sharer.php?u=' + this.url;
  }

  /**
   * Gets the Google Plus URL.
   *
   * @return The URL to share on Google Plus.
   */
  getGooglePlusUrl() {
    return 'https://plus.google.com/share?url=' + this.url;
  }

  /**
   * Gets the LinkedIn URL.
   *
   * @return The URL to share on LinkedIn.
   */
  getLinkedInUrl() {
   return 'https://www.linkedin.com/shareArticle?mini=true&url=' + this.url;
  }

  /**
   * Gets the reddit URL.
   *
   * @return The URL to share on reddit.
   */
  getRedditUrl() {
    let name = 'Interval';

    const timerName = this.timer.name;
    if (timerName !== undefined && timerName.trim().length > 0) {
      name += ' HIIT: ' + timerName;
    }
    return 'https://www.reddit.com/submit?url=' + this.url + '&resubmit=true&title=' + name;
  }
}

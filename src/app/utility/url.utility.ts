import {HttpClient} from '@angular/common/http';
import {Route} from '../constant/route.constant';
import {EncryptUtility} from './encrypt.utility';
import {ActivatedRoute} from '@angular/router';
import {ApiUtility} from './api.utility';
import {Timer} from '../content/timer/timer';

export class UrlUtility {
  private apiUtility: ApiUtility;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.apiUtility = new ApiUtility(this.http);
  }

  /**
   * Gets the timer from the URL.
   *
   * @param callback  The function that is called when the process completes.
   */
  getTimer(callback) {
    // Tries to parse the timer that comes in the URL, if it can, then we set it.
    try {
      // This may be an ID of the timer or it may be the encrypted timer.
      // We will try both.
      const urlTimer = this.route.snapshot.paramMap.get(Route.INTERNAL_TIMER_PARAM);
      const id = Number(urlTimer);

      if (isNaN(id)) {
        // this.initTimer(urlTimer);
        // callback(urlTimer);
        this.initTimer(urlTimer, callback);
      } else {
        this.apiUtility.getTimer(Number(urlTimer), (data) => {
          const timer = data.timer;
          if (timer !== undefined && timer.length > 0) {
            // this.initTimer(EncryptUtility.decode(timer));
            // callback(EncryptUtility.decode(timer));
            this.initTimer(EncryptUtility.decode(timer), callback);
          }
        });
      }
    } catch (err) {
      console.log(UrlUtility.name + ' error: ', err);

      callback();
    }
  }

  /**
   * Initializes the timer.
   *
   * @param timerString  The timer to decrypt.
   * @param callback  The function that is called when the process completes.
   */
  private initTimer(timerString: string, callback) {
    const tempTimer = JSON.parse(timerString);
    const timer = new Timer(tempTimer.name, tempTimer.intervals);
    if (timer !== undefined) {
      timer.finalize();

      callback(timer);
    } else {
      callback();
    }
  }
}

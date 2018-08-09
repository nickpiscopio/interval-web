import {HttpClient} from '@angular/common/http';
import {Route} from '../constant/route.constant';
import {EncryptUtility} from './encrypt.utility';
import {ActivatedRoute} from '@angular/router';
import {ApiUtility} from './api.utility';
import {Timer} from '../fragments/content/timer/timer';
import {Meta} from '@angular/platform-browser';
import {MetaUtility} from './meta.utility';

export class UrlUtility {
  private apiUtility: ApiUtility;

  constructor(private route: ActivatedRoute, private http: HttpClient, private meta: Meta) {
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

      const url = Route.getTimerRoute(urlTimer, false);

      if (isNaN(id)) {
        this.initTimer(urlTimer, url, callback);
      } else {
        this.apiUtility.getTimer(Number(urlTimer), (data) => {
          const timer = data.timer;
          if (timer !== undefined && timer.length > 0) {
            this.initTimer(EncryptUtility.decode(timer), url, callback);
          } else {
            callback();
          }
        });
      }
    } catch (err) {
      callback();

      console.log(UrlUtility.name + ' error: ', err);
    }
  }

  /**
   * Initializes the timer.
   *
   * @param timerString   The timer to decrypt.
   * @param url           The url of the timer.
   * @param callback      The function that is called when the process completes.
   */
  private initTimer(timerString: string, url: string, callback) {
    const tempTimer = JSON.parse(timerString);
    const timer = new Timer(tempTimer.name, tempTimer.intervals);

    // Adds the meta data tags to each page that has a timer.
    // This is for social media cards.
    new MetaUtility(this.meta, timer.name, url).addProperties();

    if (timer !== undefined) {
      timer.finalize();

      callback(timer);
    } else {
      callback();
    }
  }
}

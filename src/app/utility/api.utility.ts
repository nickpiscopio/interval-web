import {HttpClient} from '@angular/common/http';
import {Route} from '../constant/route.constant';
import {StatusCode} from '../constant/status-code.constant';
import {Communication} from './communication.utility';
import {Timer} from '../fragments/content/timer/timer';
import {EncryptUtility} from './encrypt.utility';

export class ApiUtility {
  communication: Communication;

  constructor(private http: HttpClient) {
    this.communication = new Communication(this.http);
  }

  /**
   * Calls the backend to get the timer from it's id.
   *
   * @param id          The id of the timer to retrieve.
   * @param callback    The function that gets called when the API returns.
   */
  getTimer(id: number, callback) {
    const body = {
      id: id
    };

    // Stores the timer.
    this.communication.post(Route.ROUTE_TIMER_GET, body,
      (data) => {
        if (data.Code === StatusCode.CODE_SUCCESSFUL) {
          callback(data.Body);
        } else {
          callback(body);
        }
      },
      (err) => {
        // This function gets called when we fail to update a protocol into the database.
        console.error(err);

        callback(body);
      });
  }

  /**
   * Calls the backend to store the timer.
   *
   * @param encryptedTimer  The encrypted timer to store.
   * @param callback        The function that gets called when the API returns.
   */
  storeTimer(timer: Timer, callback) {
    const body = {
      timer: EncryptUtility.encode(JSON.stringify(timer))
    };

    // Stores the timer.
    this.communication.post(Route.ROUTE_TIMER_CREATE, body,
      (data) => {
        if (data.Code === StatusCode.CODE_SUCCESSFUL) {
          callback(data.Body);
        } else {
          callback();
        }
      },
      (err) => {
        // This function gets called when we fail to update a protocol into the database.
        console.error(err);

        callback();
      });
  }
}

import {Network} from '../constant/network.constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';

export class Communication {
  constructor(private http: HttpClient) { }

  /**
   * Executes a get from the server.
   *
   * @param {string} route  The route in which to post.
   * @param success         Success callback.
   * @param error           Error callback.
   */
  public get(route: string, success, error) {
    this.http.get(Network.URL_SERVICES + route)
      .subscribe(
        (data) => {
          // For Success Response
          success(data);
        },
        // For Error Response
        (err) => {
          error(err);
        }
      );
  }

  /**
   * Executes a post to the server.
   *
   * @param {string} route  The route in which to post.
   * @param {any} body      The string of body that is posted.
   *                          DO NOT JSON.stringify() this before sending.
   * @param success         Success callback.
   * @param error           Error callback.
   */
  public post(route: string, body: any, success, error) {
    const url = Network.URL_SERVICES + route;
    body = JSON.stringify(body);
    // This escapes apostrophes, so the strings can be added to the database properly.
    body = body.replace(/'/g, '\'\'');

    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post(url, body, options)
      .subscribe(
        (data) => {
          // For Success Response
          success(data);
        },
        // For Error Response
        (err) => {
          error(err);
        }
      );
  }
}

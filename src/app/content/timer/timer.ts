import { Interval } from './interval/interval';

/**
 * This is the model class for the timer.
 */
export class Timer {
  /**
   * The constructor for the timer model.
   *
   * @param name        The name of the timer.
   * @param intervals   The associated intervals for the timer.
   */
  constructor(public name: string, public intervals: Interval[]) {
    if (name === undefined) {
      name = '';
    }

    if (intervals === undefined) {
      intervals = [];
    }
  }
}

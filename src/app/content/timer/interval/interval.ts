/**
 * This is a model class for an interval that will be in a timer.
 */
export class Interval {
  /**
   * The constructor for the interval model.
   *
   * @param name      The name of the interval.
   * @param duration  The duration of the interval.
   */
  constructor(public name: string, public duration: number) {
    if (name === undefined) {
      name = '';
    }

    if (duration === undefined) {
      duration = 0;
    }
  }
}

import { Interval } from './interval/interval';

/**
 * This is the model class for the timer.
 */
export class Timer {
  public totalDuration = 0;

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

  /**
   * Adds an interval to the timer.
   * 
   * @param interval  The interval to add to the timer.
   * @param index     The index in which to insert the interval.
   *                  This is an optional value.
   *                  If an index isn't specified, then the interval will be inserted as a new index at the end of the array.
   */
  addInterval(interval: Interval, index?: number) {
    if (index === undefined) {
      this.intervals.push(interval);
    } else {
      this.intervals.splice(index, 0, interval);
    }

    this.calculateTotalDuration();
  }

  /**
   * Duplicates an interval and places it at the lat index.
   * 
   * @param index   The index of the interval to duplicate.
   */
  duplicateInterval(index: number) {
    // We need to convert this to a number because an event will send it as a string.
    index = Number(index);

    this.addInterval(this.intervals[index], index + 1);

    this.calculateTotalDuration();
  }

  /**
   * Updates a soecified interval.
   *
   * @param index   The index of the interval that was updated.
   */
  updateInterval(index: number) {
    // We need to convert this to a number because an event will send it as a string.
    index = Number(index);

    let intervals = this.intervals;
    let lastIntervalIndex = intervals.length - 1;
    let currentIntervalContainsValues = this.doesIntervalContainValues(intervals[index]);

    if (index === lastIntervalIndex && currentIntervalContainsValues) {
      // We found that there is something in the last interval, so add a new one.
      this.addInterval(new Interval('', 0));
    } else if (index === lastIntervalIndex - 1 && (!currentIntervalContainsValues && !this.doesIntervalContainValues(intervals[lastIntervalIndex]))) {
      this.removeInterval(lastIntervalIndex);
    }

    this.calculateTotalDuration();
  }

  /**
   * Removes and interval at a specifed index.
   *
   * @param index   The interval index to remove.
   */
  removeInterval(index: number) {
    // We need to convert this to a number because an event will send it as a string.
    index = Number(index);
    // Remove 1 index at the specifed index.
    this.intervals.splice(index, 1);

    this.calculateTotalDuration();
  }

  /**
   * Loops through the durations of the intervals and calculates the total time for the timer.
   */
  private calculateTotalDuration() {
    this.totalDuration = 0;

    let length = this.intervals.length;
    for(let i = 0; i < length; i++) {
      // Converts the duration in the specified interval to a number and then adds it to the total duration.
      this.totalDuration += Number(this.intervals[i].duration);
    }
  }

  /**
   * Checks to see if a specified interval contains any values.
   *
   * @param interval  The interval to check.
   */
  private doesIntervalContainValues(interval: Interval) {
    return (interval.name !== undefined && interval.name.trim() !== '') || (interval.duration !== undefined && interval.duration > 0);
  }
}

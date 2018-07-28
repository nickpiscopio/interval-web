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

    this.calculateTotalDuration();
  }

  /**
   * Adds a default interval.
   */
  addDefaultInterval() {
    this.addInterval(new Interval('', 0));
  }

  /**
   * Finalizes the timer by removing any intervals that don't have a duration.
   */
  finalize() {
    const length = this.intervals.length;
    // We need to loop backwards so then we can remove the proper indecies when removing intervals.
    for (let i = length - 1; i >= 0; i--) {
      const interval = this.intervals[i];
      if (interval === undefined || interval.duration <= 0) {
        // We found a duration that isn't valid, so remove it.
        this.removeInterval(i);
      }
    }

    this.calculateTotalDuration();
  }

  /**
   * Gets the total number of valid intervals.
   *
   * @return The total number of intervals.
   */
  getTotalIntervals() {
    let totalIntervals = 0;
    const length = this.intervals.length;
    for (let i = 0; i < length; i++) {
      const interval = this.intervals[i];
      if (interval !== undefined && interval.duration > 0) {
        // We found a valid interval, so increment the total.
        totalIntervals++;
      }
    }

    return totalIntervals;
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
    // We need to create a new object for this to work properly.
    // If we don't, then the objects will be linked.
    interval = new Interval(interval.name, interval.duration);

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
    this.addInterval(this.intervals[index], index + 1);

    this.calculateTotalDuration();
  }

  /**
   * Updates a soecified interval.
   *
   * @param index   The index of the interval that was updated.
   */
  updateInterval(index: number) {
    const intervals = this.intervals;
    const lastIntervalIndex = intervals.length - 1;
    const currentIntervalContainsValues = this.doesIntervalContainValues(intervals[index]);

    if (index === lastIntervalIndex && currentIntervalContainsValues) {
      // We found that there is something in the last interval, so add a new one.
      this.addDefaultInterval();
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
    // Remove 1 index at the specified index.
    this.intervals.splice(index, 1);
  }

  /**
   * Removes and interval at a specifed index and recalculates the total duration.
   *
   * @param index   The interval index to remove.
   */
  removeIntervalAndCalculateDuration(index: number) {
    // Remove 1 index at the specifed index.
    this.removeInterval(index);

    this.calculateTotalDuration();
  }

  /**
   * Gets the remaining duration from the timer.
   *
   * @param index     The index of the current interval.
   * @param timeLeft  The amount of time left in the current interval.
   */
  getRemainingDuration(index: number, timeLeft: number): number {
    return this.calculateDuration(index) - (this.intervals[index].duration - timeLeft);
  }

   /**
   * Loops through the durations of the intervals and calculates the total time for the timer.
   *
   * @param index   The index in which to start the calculation.
   *
   * @return The calculated duration.
   */
  calculateDuration(index: number): number {
    let duration = 0;

    const length = this.intervals.length;
    for (let i = index; i < length; i++) {
      // Converts the duration in the specified interval to a number and then adds it to the total duration.
      duration += Number(this.intervals[i].duration);
    }

    return duration;
  }

  /**
   * Loops through the durations of the intervals and calculates the total time for the timer.
   *
   * @param index   The index in which to start the calculation.
   */
  private calculateTotalDuration() {
    this.totalDuration = this.calculateDuration(0);
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

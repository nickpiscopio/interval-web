import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Timer } from '../timer';
import { Interval } from '../interval/interval';
import { Route } from '../../../constant/route.constant';

@Component({
  selector: 'app-timer-create',
  templateUrl: './timer-create.component.html',
  styleUrls: ['./timer-create.component.sass']
})
export class TimerCreateComponent {
  // This is the set of keys that we use to get from JSON objects.
  private objectKeys = Object.keys;

  private timer: Timer;

  constructor(private route: ActivatedRoute, private router: Router) {
    // Tries to parse the timer that comes in the URL, if it can, then we set it.
    try {
      this.timer = JSON.parse(this.route.snapshot.paramMap.get(Route.INTERNAL_TIMER_PARAM));
    } catch (err) {
      console.log(TimerCreateComponent.name + ' error: ', err);

      this.timer = new Timer('', []);
    }

    // We add an interval here because we always want at least 1.
    this.addInterval();
  }

  /**
   * Updates the intervals.
   *
   * @param index   The index of the interval that was updated.
   */
  updateIntervals(index: number) {
    index = Number(index);
    let intervals = this.timer.intervals;
    let lastIntervalIndex = intervals.length - 1;
    let currentIntervalContainsValues = this.doesIntervalContainValues(intervals[index]);

    if (index === lastIntervalIndex && currentIntervalContainsValues) {
      // We found that there is something in the last interval, so add a new one.
      this.addInterval();
    } else if (index === lastIntervalIndex - 1 && (!currentIntervalContainsValues && !this.doesIntervalContainValues(intervals[lastIntervalIndex]))) {
      this.removeInterval(lastIntervalIndex);
    }
  }

  /**
   * Adds an interval to the timer.
   */
  addInterval() {
    this.timer.intervals.push(new Interval('', 0));
  }

  /**
   * Removes and interval at a specifed index.
   *
   * @param index   The interval index to remove.
   */
  removeInterval(index: number) {
    // Remove 1 index at the specifed index.
    this.timer.intervals.splice(index, 1);
  }

  /**
   * Checks to see if a specified interval contains any values.
   *
   * @param interval  The interval to check.
   */
  doesIntervalContainValues(interval: Interval) {
    return (interval.name !== undefined && interval.name.trim() !== '') || (interval.duration !== undefined && interval.duration > 0);
  }

  /**
   * Checks to make sure the timer has proper intervals.
   */
  hasIntervals() {
    return this.timer.intervals !== undefined && this.objectKeys(this.timer.intervals).length > 0;
  }

  /**
   * Starts the timer.
   */
  start() {
    let timer = JSON.stringify(this.timer);

    console.log('Timer: ', timer);

    this.router.navigate([Route.getTimerRoute(timer, true)]);
  }
}

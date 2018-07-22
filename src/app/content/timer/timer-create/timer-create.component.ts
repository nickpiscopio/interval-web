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

  // Flag to tell the clock-display to parse the time.
  private parseTime = true;

  constructor(private route: ActivatedRoute, private router: Router) {
    // Tries to parse the timer that comes in the URL, if it can, then we set it.
    try {
      let urlObj = JSON.parse(this.route.snapshot.paramMap.get(Route.INTERNAL_TIMER_PARAM));
      this.timer = new Timer(urlObj.name, urlObj.intervals);
    } catch (err) {
      console.log(TimerCreateComponent.name + ' error: ', err);

      this.timer = new Timer('', []);
    }

    // We add an interval here because we always want at least 1.
    this.timer.addInterval(new Interval('', 0));
  }

  /**
   * Duplicates an interval and places it at the lat index.
   * 
   * @param index   The index of the interval to duplicate.
   */
  duplicateInterval(index: number) {
    // We need to convert the index to a number because an event will send it as a string.
    this.timer.duplicateInterval(Number(index));
  }

/**
   * Updates a soecified interval.
   *
   * @param index   The index of the interval that was updated.
   */
  updateInterval(index: number) {
    // We need to convert the index to a number because an event will send it as a string.
    this.timer.updateInterval(Number(index));
  }

  /**
   * Removes and interval at a specifed index.
   *
   * @param index   The interval index to remove.
   */
  removeInterval(index: number) {
    // We need to convert the index to a number because an event will send it as a string.
    this.timer.removeInterval(Number(index));
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

    console.info('Timer: ', timer);

    this.router.navigate([Route.getTimerRoute(timer, true)]);
  }
}

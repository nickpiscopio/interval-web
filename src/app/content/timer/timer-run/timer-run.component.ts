import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Timer } from '../timer';
import { Route } from '../../../constant/route.constant';
import { Interval } from '../interval/interval';

// 1 second timer tick.
const TICK = 1000;
const MESSAGE_INTERVALS_FINISHED = 'FINISHED!';

@Component({
  selector: 'app-timer-run',
  templateUrl: './timer-run.component.html',
  styleUrls: ['./timer-run.component.sass']
})
export class TimerComponent {
  // This is the set of keys that we use to get from JSON objects.
  private objectKeys = Object.keys;

  private timer: Timer;

  private time: number;

  private intervalTimer;

  // This is the current interval index that is being displayed.
  private intervalIndex = 0;

  private intervalNotification1;
  private intervalNotification2;

  constructor(private route: ActivatedRoute) {
    this.intervalNotification1 = new Audio('assets/sounds/beep_1.mp3');
    this.intervalNotification2 = new Audio('assets/sounds/beep_2.mp3');

    // Tries to parse the timer that comes in the URL, if it can, then we set it.
    try {
      this.timer = JSON.parse(this.route.snapshot.paramMap.get(Route.INTERNAL_TIMER_PARAM));
    } catch (err) {
      console.log(TimerComponent.name + ' error: ', err);
    }

    if (this.timer !== undefined) {
      let intervals = this.timer.intervals;
      if (intervals !== undefined && this.objectKeys(intervals).length > 0) {
        this.runTimer(intervals);
      }
    }
  }

  /**
   * Runs the timer.
   *
   * @param intervals   The intervals to display to the user.
   */
  runTimer(intervals: Interval[]) {
    // Remove the old interval timer if there is one.
    // We don't want to run into issues later.
    clearInterval(this.intervalTimer);

    let interval = intervals[this.intervalIndex];
    // If the interval is undefined, then we reached the end of the intervals, and we should finish.
    if (interval !== undefined) {
      this.time = interval.duration;

      this.intervalTimer = setInterval(() => {
        this.time -= TICK;

        // This plays sounds for when the timer gets to 3 seconds and below.
        // It is to notify the user that the interval is about to finish or has finished.
        switch (this.time) {
          case 3000:
          case 2000:
          case 1000:
            this.intervalNotification1.play();
            break;
          case 0:
            this.intervalNotification2.play();
            break;
          default:
            break;
        }

        if (this.time < 0) {
          // Increment the index so we can see the next interval timer.
          this.intervalIndex++;

          this.runTimer(intervals);
        }
      }, TICK);
    }
  }

  /**
   * Gets the human readable time in seconds.
   *
   * @return The time in seconds or a message saying the timer is finished.
   */
  getTime() {
    return this.time < 0 ? MESSAGE_INTERVALS_FINISHED : this.time / TICK;
  }
}

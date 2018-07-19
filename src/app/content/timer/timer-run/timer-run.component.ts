import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Timer } from '../timer';
import { Route } from '../../../constant/route.constant';
import { Interval } from '../interval/interval';
import { fade } from '../../../animations/fade';

// 1 second timer tick for the intervals.
const TICK = 1000;
const THRESHOLD_PAUSE_VISIBILTY = 2000;
const MESSAGE_INTERVAL_PAUSED = 'INTERVAL PAUSED';
const MESSAGE_INTERVALS_FINISHED = 'FINISHED!';

@Component({
  selector: 'app-timer-run',
  templateUrl: './timer-run.component.html',
  styleUrls: ['./timer-run.component.sass'],
  animations: [fade]
})
export class TimerComponent implements OnDestroy {
  // This is the set of keys that we use to get from JSON objects.
  private objectKeys = Object.keys;

  private timer: Timer;

  private intervalName: string;
  private nextIntervalName: string;
  private pauseState: string;

  private time: number;

  private intervalTimer;
  private pauseTimer;

  // This is the current interval index that is being displayed.
  private intervalIndex = 0;

  private intervalNotification1;
  private intervalNotification2;

  // Boolean value for if the timer is paused or not.
  private paused = false;
  private displayPause: boolean;

  constructor(private route: ActivatedRoute) {
    this.displayPause = false;

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
        this.runTimer(intervals, false);
      }
    }
  }

  ngOnDestroy() {
    // We need to destroy all timers in case we go back to a different screen or navigate away for any reason.
    clearInterval(this.intervalTimer);
    clearInterval(this.pauseTimer);
  }

  /**
   * Runs the timer.
   *
   * @param intervals   The intervals to display to the user.
   * @param resuming    Boolean value for whether the user selected to resume the interval.
   */
  runTimer(intervals: Interval[], resuming: boolean) {
    // Remove the old interval timer if there is one, so we don't run into issues creating a new one.
    clearInterval(this.intervalTimer);

    let interval = intervals[this.intervalIndex];
    // If the interval is undefined, then we reached the end of the intervals, and we should finish.
    if (interval !== undefined) {
      this.intervalName = interval.name;

      let nextInterval = intervals[this.intervalIndex + 1];
      if (nextInterval !== undefined) {
        this.nextIntervalName = nextInterval.name;
      } else {
        this.nextIntervalName = undefined;
      }

      // We only set the time if we are resuming.
      // We do this because we don't want the time to reset if the user clicks to pause then resume.
      if (!resuming) {
        this.time = interval.duration;
      }

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

          this.runTimer(intervals, false);
        }
      }, TICK);
    }
  }

  /**
   * Returns whether to display the next interval label.
   *
   * @return Boolean value on whether to display the next interval label.
   */
  displayNextIntervalLabel() {
    return this.nextIntervalName !== undefined;
  }

  /**
   * Starts or stops the timer depending upon what was already done.
   */
  setTimerActivation() {
    if (this.paused) {
      this.pauseState = '';

      // The timer is started again, so create a new timer and resume where we left off.
      this.runTimer(this.timer.intervals, true);
    } else {
      // The timer is paused, so clear the innterval timer so it doesn't continue.
      clearInterval(this.intervalTimer);

      this.pauseState = MESSAGE_INTERVAL_PAUSED;
    }

    this.paused = !this.paused;
  }

  /**
   * Switches the pause flag to true so we can see the play/pause button.
   */
  showPause() {
    this.displayPause = true;

    // Remove the old pause timer if there is one, so we don't run into issues creating a new one.
    clearInterval(this.pauseTimer);

    // We want to eventually hide the pause button, so we create a timeout.
    // We do this because there isn't a mouse out event to accomplish this task.
    this.pauseTimer = setTimeout(() => {
      // Hides the pause button.
      this.displayPause = false;

      // Remove the pause timer since we are done using it.
      clearInterval(this.pauseTimer);
    }, THRESHOLD_PAUSE_VISIBILTY);
  }

  /**
   * Returns whether the pause should be shown.
   *
   * @return Whether the pause should be shown.
   */
  shouldShowPause() {
    return this.displayPause || this.paused;
  }

  /**
   * Gets the icon for the start/pause button.
   *
   * @return The icon for the start/pause button.
   */
  getStartPauseButtonIcon() {
    return this.paused ? 'play_arrow' : 'pause';
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

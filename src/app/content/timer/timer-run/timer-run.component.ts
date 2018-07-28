import { Component, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Timer } from '../timer';
import { Route } from '../../../constant/route.constant';
import { Interval } from '../interval/interval';
import { fade } from '../../../animations/fade';
import { Time } from '../../../utility/time.utility';
import { KeyCode } from '../../../constant/key-code.constant.1';

const VOLUME_LOWEST = 0;
const VOLUME_HIGHEST = 1;
const VOLUME_DEFAULT = 0.6;

const ICON_VOLUME_DOWN = 'volume_down';
const ICON_VOLUME_OFF = 'volume_off';
const ICON_VOLUME_UP = 'volume_up';

const ICON_PLAY = 'play_arrow';
const ICON_PAUSE = 'pause';

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

  private time: number;

  // This is the current interval index that is being displayed.
  private intervalIndex = 0;

  private intervalTimer;
  private pauseTimer;

  private intervalNotification1;
  private intervalNotification2;

  private displayPause: boolean;
  // Boolean value for if the timer is paused or not.
  private paused = false;

  // We default the volume to 70%.
  private volume = VOLUME_DEFAULT;

  constructor(private route: ActivatedRoute) {
    this.displayPause = false;

    this.intervalNotification1 = new Audio('assets/sounds/beep_1.mp3');
    this.intervalNotification2 = new Audio('assets/sounds/beep_2.mp3');

    this.intervalNotification1.volume = this.volume;
    this.intervalNotification2.volume = this.volume;

    // Tries to parse the timer that comes in the URL, if it can, then we set it.
    try {
      let urlObj = JSON.parse(this.route.snapshot.paramMap.get(Route.INTERNAL_TIMER_PARAM));
      this.timer = new Timer(urlObj.name, urlObj.intervals);
      this.timer.finalize();
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
        this.time -= Time.SECOND;

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

          // Scroll to the interval because it just changed.
          this.scrollToInterval();

          this.runTimer(intervals, false);
        }
      }, Time.SECOND);
    }
  }

  /**
   * Selects the interval to switch to.
   *
   * @param index   The interval of the index in which to switch.
   */
  selectInterval(index: number) {
    // We need to convert the index to a number because an event will send it as a string.
    index = Number(index);

    this.intervalIndex = index;

    this.paused = false;

    // Scroll to the interval because the user has selected it.
    this.scrollToInterval();

    this.runTimer(this.timer.intervals, false)
  }

  /**
   * Smoothly scrolls to the current interval.
   */
  scrollToInterval() {
    document.getElementById(this.intervalIndex.toString()).scrollIntoView({ behavior: 'smooth' });
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
      // The timer is started again, so create a new timer and resume where we left off.
      this.runTimer(this.timer.intervals, true);
    } else {
      // The timer is paused, so clear the innterval timer so it doesn't continue.
      clearInterval(this.intervalTimer);
    }

    this.paused = !this.paused;
  }

  /**
   * This is a hotlistener that listens for whenever a key was pressed.
   *
   * @param event The KeyboardEvent that was executed.
   */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // We want to listen to the space bar being hit to pause and start the timer.
    if (event.keyCode === KeyCode.KEY_CODE_SPACE) {
      this.setTimerActivation();
    }
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
    return this.paused ? ICON_PLAY : ICON_PAUSE;
  }

  /**
   * Checks to see if the timer has finished.
   *
   * @return Boolean value on whether or not the timer has finished.
   */
  isTimerFinished() {
    return this.intervalIndex == this.timer.intervals.length && this.timer.totalDuration == 0;
  }

  /**
   * Gets the remaining duration from the timer.
   */
  getRemainingDuration() {
    return this.timer.getRemainingDuration(this.intervalIndex, this.time);
  }

  /**
   * Gets the current interval number.
   */
  getCurrentIntervalNumber() {
    return this.intervalIndex + 1;
  }

  /**
   * Gets the interval total.
   */
  getIntervalTotal() {
    return this.timer.intervals.length;
  }

  /**
   * Sets the volume of the notifications.
   */
  setVolume() {
    if (this.volume > VOLUME_LOWEST) {
      this.volume = VOLUME_LOWEST;
    } else {
      this.volume = VOLUME_DEFAULT
    }
  }

  /**
   * Gets the icon of the volumne button
   */
  getVolumeIcon() {
    let icon;

    switch(this.volume) {
      case VOLUME_LOWEST:
        icon = ICON_VOLUME_OFF;
        break;
      case VOLUME_HIGHEST:
        icon = ICON_VOLUME_UP;
        break;
      default:
        icon = ICON_VOLUME_DOWN;
        break;
    }

    return icon;
  }
}

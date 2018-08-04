import { Component, OnDestroy, HostListener } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Timer } from '../timer';
import { Interval } from '../interval/interval';
import { fade } from '../../../../animations/fade';
import { Time } from '../../../../utility/time.utility';
import { KeyCode } from '../../../../constant/key-code.constant';
import {HttpClient} from '@angular/common/http';
import {UrlUtility} from '../../../../utility/url.utility';
// This is a library that stops the device from sleeping.
// We only have this enabled when the timer is running.
// Once the timer stops running, we allow the device to sleep again.
// Documentation: https://github.com/richtr/NoSleep.js?utm_source=recordnotfound.com
import * as NoSleep from 'nosleep.js';
import {MessageUtility} from '../../../../utility/message.utility';
import {MatDialog} from '@angular/material';
import {Route} from '../../../../constant/route.constant';
import {ShareComponent} from '../../../dialog/share/share.component';

const VOLUME_LOWEST = 0;
const VOLUME_HIGHEST = 1;
const VOLUME_DEFAULT = 0.6;

const ICON_VOLUME_DOWN = 'volume_down';
const ICON_VOLUME_OFF = 'volume_off';
const ICON_VOLUME_UP = 'volume_up';

const ICON_SHARE = 'share';
const ICON_PAUSE = 'pause';

// This is the event for 'NoSleep'.
// It is needed because 'NoSleep' must be wrapped in a user input event handler.
// e.g. a mouse or touch handler
const EVENT_NO_SLEEP = 'click';

const ERROR_OPENING_TIMER_TITLE = 'That timer must be a ghost!';
const ERROR_OPENING_TIMER_MESSAGE = 'We can\'t find the timer you are looking for. Would you like to create your own?';
const ERROR_OPENING_TIMER_POSITIVE_BUTTON = 'CREATE TIMER';
const MESSAGE_SHARE_WHILE_PAUSED = 'INTERVAL IS PAUSED';
const MESSAGE_CONGRATULATIONS = 'CONGRATULATIONS ON FINISHING!';

@Component({
  selector: 'app-timer-run',
  templateUrl: './timer-run.component.html',
  styleUrls: ['./timer-run.component.sass'],
  animations: [fade]
})
export class TimerComponent implements OnDestroy {
  timer: Timer;

  intervalName: string;
  nextIntervalName: string;

  time: number;

  // Boolean value for if the timer is paused or not.
  paused = false;

  // Boolean value to tell whether the timer is loading or not.
  isLoading = false;

  // Flag to tell if the timer is finished or not.
  isTimerFinished: boolean;

  // This is the current interval index that is being displayed.
  intervalIndex = 0;

  private intervalTimer;

  private intervalNotification1;
  private intervalNotification2;

  // We default the volume to 70%.
  private volume = VOLUME_DEFAULT;

  private noSleep;

  private destroyed = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private http: HttpClient) {

    this.isLoading = true;

    this.noSleep = new NoSleep();

    // Enable wake lock.
    document.addEventListener(EVENT_NO_SLEEP, this.enableNoSleep, false);

    this.intervalNotification1 = new Audio('assets/sounds/beep_1.mp3');
    this.intervalNotification2 = new Audio('assets/sounds/beep_2.mp3');

    this.intervalNotification1.volume = this.volume;
    this.intervalNotification2.volume = this.volume;

    new UrlUtility(route, http).getTimer((timer) => {
      if (timer !== undefined) {
        this.timer = timer;

        const intervals = this.timer.intervals;
        if (intervals !== undefined && intervals.length > 0) {
          this.runTimer(intervals, false);
        }
      } else {
        new MessageUtility(dialog)
          .openDialog(ERROR_OPENING_TIMER_TITLE,
                      ERROR_OPENING_TIMER_MESSAGE,
                     null,
                      ERROR_OPENING_TIMER_POSITIVE_BUTTON)
          .afterClosed().subscribe(() => {
            // Go to the create screen back because we don't have a valid timer.
            this.router.navigate([Route.INTERNAL_ROUTE_TIMER_CREATE]);
        });
      }

      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.destroyed = true;
    // We need to destroy all timers in case we go back to a different screen or navigate away for any reason.
    clearInterval(this.intervalTimer);

    // We disable 'NoSleep' here because we left the timer page.
    this.disableNoSleep();
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

    // We enable the no sleep, so then the computer or phone doesn't go to sleep while the intervals are running.
    // This gets disabled later if the timer stops or the timer is paused.
    this.enableNoSleep();

    const interval = intervals[this.intervalIndex];
    // If the interval is undefined, then we reached the end of the intervals, and we should finish.
    if (interval !== undefined) {
      this.isTimerFinished = false;

      this.intervalName = interval.name;

      const nextInterval = intervals[this.intervalIndex + 1];
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
    } else {
      this.isTimerFinished = true;
      // We subtract from the index here because there aren't any intervals left,
      // and we don't want to display to the user that there is 1 more interval, so we just remove it.
      this.intervalIndex--;

      // We disable 'NoSleep' here just in case the timer is actually finished.
      this.disableNoSleep();

      this.displayShareDialog(MESSAGE_CONGRATULATIONS);

      this.paused = true;
    }
  }

  /**
   * Opens the share dialog.
   */
  displayShareDialog(message: string) {
    this.dialog.open(ShareComponent, {
      data: { timer: this.timer, message: message }
    }).afterClosed().subscribe(() => {
      this.setTimerActivation();
    });
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

    this.runTimer(this.timer.intervals, false);
  }

  /**
   * Smoothly scrolls to the current interval.
   */
  scrollToInterval() {
    const view = document.getElementById(this.intervalIndex.toString());
    if (view !== null) {
      view.scrollIntoView({ behavior: 'smooth' });
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
    if (!this.destroyed) {
      // We only want to pause/resume if the timer isn't finished.
      if (!this.isTimerFinished) {
        if (this.paused) {
          // The timer is started again, so create a new timer and resume where we left off.
          this.runTimer(this.timer.intervals, true);
        } else {
          // The timer is paused, so clear the interval timer so it doesn't continue.
          clearInterval(this.intervalTimer);

          // We disable 'NoSleep' here because the timer is paused.
          this.disableNoSleep();

          this.displayShareDialog(MESSAGE_SHARE_WHILE_PAUSED);
        }
      } else if (!this.paused) {
        this.displayShareDialog(MESSAGE_CONGRATULATIONS);
      }

      // This is outside of the condition because it displays the pause/share button if the timer isn't paused.
      this.paused = !this.paused;
    }
  }

  /**
   * This is a HotListener that listens for whenever a key was pressed.
   *
   * @param event The KeyboardEvent that was executed.
   */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // We want to listen to the space bar being hit to pause and start the timer.
    if (!this.paused && event.keyCode === KeyCode.KEY_CODE_SPACE) {
      this.setTimerActivation();
    }
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
      this.volume = VOLUME_DEFAULT;
    }
  }

  /**
   * Gets the icon of the volume button
   */
  getVolumeIcon() {
    let icon;

    switch (this.volume) {
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

  /**
   * Gets the icon of the pause button
   */
  getPauseIcon() {
    return this.isTimerFinished ? ICON_SHARE : ICON_PAUSE;
  }

  /**
   * Keeps the screen awake while the timer is running.
   */
  enableNoSleep() {
    this.noSleep.enable();

    document.removeEventListener(EVENT_NO_SLEEP, this.enableNoSleep, false);
  }

  /**
   * Disables the no sleep so the device can sleep again.
   */
  disableNoSleep() {
    this.noSleep.disable();
  }

  /**
   * Tells when the terms visibility changed.
   *
   * @param isVisible   Boolean value telling if terms is visible.
   */
  onTermsVisibilityChanged(isVisible: boolean) {
    if (isVisible) {
      this.setTimerActivation();
    }
  }
}

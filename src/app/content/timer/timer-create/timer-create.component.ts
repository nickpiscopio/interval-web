import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Timer } from '../timer';
import { Interval } from '../interval/interval';
import { Route } from '../../../constant/route.constant';
import { Color } from '../../../utility/color.utility';

// This is the group to allow reordering intervals by dragging.
const GROUP_INTERVALS = 0;

@Component({
  selector: 'app-timer-create',
  templateUrl: './timer-create.component.html',
  styleUrls: ['./timer-create.component.sass']
})
export class TimerCreateComponent {
  private timer: Timer;
  
  private color: Color;
 
  constructor(private route: ActivatedRoute, private router: Router) {
    this.color = new Color();

    // Tries to parse the timer that comes in the URL, if it can, then we set it.
    try {
      let urlObj = JSON.parse(this.route.snapshot.paramMap.get(Route.INTERNAL_TIMER_PARAM));
      this.timer = new Timer(urlObj.name, urlObj.intervals);

      let intervals = this.timer.intervals;
      let length = intervals.length;
      for (let i = 0; i < length; i++) {
        // Generate a color for each interval since we start off with intervals.
        this.color.generateColor(intervals[i].name)
      }
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
    index = Number(index);

    this.color.generateColor(this.timer.intervals[index].name)
    
    this.timer.updateInterval(index);
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
    return this.timer.intervals !== undefined && this.timer.intervals.length > 0;
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

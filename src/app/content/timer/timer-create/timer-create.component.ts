import { Component } from '@angular/core';
import { Timer } from '../timer';
import { Interval } from '../interval/interval';

@Component({
  selector: 'app-timer-create',
  templateUrl: './timer-create.component.html',
  styleUrls: ['./timer-create.component.sass']
})
export class TimerCreateComponent {
  // This is the set of keys that we use to get from JSON objects.
  private objectKeys = Object.keys;

  private timer: Timer;

  constructor() {
    this.timer = new Timer('', []);
  }

  /**
   * Adds an interval to the timer.
   */
  addInterval() {
    this.timer.intervals.push(new Interval('', 0));
  }

  save() {
    console.log('timer: ', JSON.stringify(this.timer));
  }
}

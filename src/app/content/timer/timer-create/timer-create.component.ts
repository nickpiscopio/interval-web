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
    this.timer = new Timer('', []);
  }

  ngOnInit() {
    // Tries to parse the timer that comes in the URL, if it can, then we set it.
    try {
      this.timer = JSON.parse(this.route.snapshot.paramMap.get(Route.INTERNAL_TIMER_PARAM));
    } catch (err) {
      console.log(TimerCreateComponent.name + ' error: ', err);
    }
  }

  /**
   * Adds an interval to the timer.
   */
  addInterval() {
    this.timer.intervals.push(new Interval('', 0));
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

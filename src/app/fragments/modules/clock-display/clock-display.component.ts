import { Component, Input, OnChanges } from '@angular/core';
import { Time } from '../../../utility/time.utility';

@Component({
  selector: 'app-clock-display',
  templateUrl: './clock-display.component.html',
  styleUrls: ['./clock-display.component.sass']
})
export class ClockDisplayComponent implements OnChanges {
  @Input() time: number;
  // Flag to check if the timer is finished.
  @Input() isTimerFinished: boolean;

  timeUtil = new Time();

  ngOnChanges(changes) {
    if (changes.time !== undefined && changes.time.currentValue >= 0) {
      // Parses the time in to display in a human readable format
      this.timeUtil.parseTime(this.time);
    }

    if (changes.isTimerFinished !== undefined && changes.isTimerFinished.currentValue) {
      this.shouldDisplaySeconds();
    } else {
      this.isTimerFinished = false;
    }
  }

  /**
   * Checks to see if seconds should be displayed.
   *
   * @return Boolean value on whether or not the seconds should be displayed.
   */
  shouldDisplaySeconds() {
    return (this.timeUtil.hours === 0 && this.timeUtil.minutes === 0 && !this.isTimerFinished) ||
           (this.timeUtil.seconds > 0 && !this.isTimerFinished);
  }
}

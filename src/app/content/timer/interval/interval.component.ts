import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Interval } from './interval';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.sass']
})
export class IntervalComponent {
  // This is the index of the interval in the intervals array in the timer.
  @Input() index: number;

  @Input() interval: Interval;

  @Output() intervalUpdated = new EventEmitter<number>();

  /**
   * Function that gets executed when the input values change.
   */
  onChange() {
    this.intervalUpdated.emit(this.index);
  }
}

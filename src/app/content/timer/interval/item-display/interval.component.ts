import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Interval } from './../interval';
import { Class } from '../../../../constant/class.constant';
import { Time } from '../../../../utility/time.utility';

@Component({
  selector: 'app-interval-display',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.sass']
})
export class IntervalDisplayComponent implements OnInit {
  // This is the index of the interval in the intervals array in the timer.
  @Input() index: number;
  // This is the current index of the timer.
  @Input() currentIndex: number;

  @Input() interval: Interval;

  @Output() intervalSelected = new EventEmitter<number>()

  private timeUtil = new Time();

  ngOnInit() {
    this.timeUtil.parseTime(this.interval.duration);
  }

  /**
   * Emits the index that was selected.
   */
  selectInterval() {
    this.intervalSelected.emit(this.index);
  }

  /**
   * Gets the class for the interval that will change the way it is displayed to the user.
   * 
   * @return The class for the interval.
   */
  getClass() {
    return this.index == this.currentIndex ? Class.ACTIVE + ' ': '';
  }
}

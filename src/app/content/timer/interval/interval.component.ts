import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Interval } from './interval';
import { Class } from '../../../constant/class.constant';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.sass']
})
export class IntervalComponent {
  // This is the index of the interval in the intervals array in the timer.
  @Input() index: number;

  @Input() interval: Interval;

  @Output() updateInterval = new EventEmitter<number>();
  @Output() duplicateInterval = new EventEmitter<number>();
  @Output() removeInterval = new EventEmitter<number>();

  // @ViewChild('seconds') secondsInput: ElementRef;

  // private hours: number;
  // private minutes: number;
  // private seconds: number;

  /**
   * Emits that the interval was updated.
   */
  onChange() {
    this.updateInterval.emit(this.index);
  }

  /**
   * Emits to duplicate the interval.
   */
  duplicate() {
    this.duplicateInterval.emit(this.index);
  }

  /**
   * Emits to remove the interval.
   */
  remove() {
    this.removeInterval.emit(this.index);
  }

  /**
   * Checks to see if the interval has any values.
   */
  hasValues() {
    let name = this.interval.name;
    let duration = this.interval.duration;
    return (name !== undefined && name.trim() !== '') ||
           (duration !== undefined && duration > 0);
  }

  /**
   * Gets the class for the interval card that will change the way it is displayed to the user.
   */
  getClass() {
    return !this.hasValues() ? Class.INACTIVE + ' ': '';
  }

  // onChangeHours() {}

  // onChangeMinutes() {}

  // onChangeSeconds(event: KeyboardEvent) {
  //   console.log('$event:', event);
  //   console.log('seconds:', this.seconds);

  //   try {
  //     let typedVal = Number(this.secondsInput.nativeElement).toString();
  //     if (typedVal !== 'NaN') {
  //       let secondsString = this.seconds.toString + typedVal;
  //       this.seconds = Number(secondsString);
  //     }
  //   } catch (err) {}
  // }
}

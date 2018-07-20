import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('seconds') secondsInput: ElementRef;

  private hours: number;
  private minutes: number;
  private seconds: number;

  /**
   * Function that gets executed when the input values change.
   */
  onChange() {
    this.intervalUpdated.emit(this.index);
  }

  onChangeHours() {}

  onChangeMinutes() {}

  onChangeSeconds(event: KeyboardEvent) {
    console.log('$event:', event);
    console.log('seconds:', this.seconds);

    try {
      let typedVal = Number(this.secondsInput.nativeElement).toString();
      if (typedVal !== 'NaN') {
        let secondsString = this.seconds.toString + typedVal;
        this.seconds = Number(secondsString);
      }
    } catch (err) {}
  }
}

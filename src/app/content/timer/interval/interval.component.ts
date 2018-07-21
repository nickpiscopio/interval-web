import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Interval } from './interval';
import { Class } from '../../../constant/class.constant';

const KEY_CODE_BACKSPACE = 8;
const KEY_CODE_DELETE = 46;

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

  private hours = '00';
  private minutes = '00';
  private seconds = '00';

  private time = ['0','0','0','0','0','0'];

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
   * Emits that the interval was updated.
   */
  onChange() {
    this.updateInterval.emit(this.index);
  }

  /**
   * Executes when the user changes the duration.
   * 
   * @param event   The KeyboardEvent that references the keys taht were pressed by the user.
   */
  onChangeDuration(event: KeyboardEvent) {
    let tempArr = this.getTimeArray();

    switch(event.keyCode) {
        case KEY_CODE_BACKSPACE:
        case KEY_CODE_DELETE:
          // Adds a 0 to the first index because we removed an value.
          tempArr.unshift("0");

          break;
        default:
          // We only want 6 indecies in the array at a time, so we need to remove from the head since we are adding from the end. 
          tempArr.splice(0, tempArr.length - 6);
          
          break;
      }

    this.time = tempArr;

    this.setTime();
  }

  /**
   * Sets the time to display to the user in the inputs.
   * There are only allowed to be 6 indecies in the time array at any point in time.
   */
  setTime() {
    // The first two indecies will always be the hours.
    this.hours = this.time[0] + this.time[1];
    // The second two indecies will always be the minutes.
    this.minutes = this.time[2] + this.time[3];
    // The third two indecies will always be the seconds.
    this.seconds = this.time[4] + this.time[5];

    // Now that the time has been changed by the user, parse it to be millis.
    this.convertTimeToMillis();
  }

  /**
   * Converts the time to milliseconds and then notifies the change the user made to the duration.
   */
  convertTimeToMillis() {
    let hoursInSeconds = Math.floor(Number(this.hours) * 3600);
    let minutesInSeconds = Math.floor((Number(this.minutes) * 60));
    let seconds = Number(this.seconds);

    this.interval.duration = (hoursInSeconds + minutesInSeconds + seconds) * 1000

    this.onChange();
  }

  /**
   * Gets the time array.
   */
  getTimeArray() {
    return this.hours.split("").concat(this.minutes.split("").concat(this.seconds.split("")));
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
}

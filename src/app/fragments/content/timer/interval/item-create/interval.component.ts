import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { Interval } from '../interval';
import { Class } from '../../../../../constant/class.constant';
import { Time } from '../../../../../utility/time.utility';
import { fade } from '../../../../../animations/fade';
import { KeyCode } from '../../../../../constant/key-code.constant';

const DEFAULT_TIME_DIGIT = '0';
const DEFAULT_TIME = DEFAULT_TIME_DIGIT + DEFAULT_TIME_DIGIT;

@Component({
  selector: 'app-interval-create',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.sass'],
  animations: [fade]
})
export class IntervalCreateComponent implements OnChanges {
  @ViewChild('hoursInput') hoursInput: ElementRef;
  @ViewChild('minutesInput') minutesInput: ElementRef;
  @ViewChild('secondsInput') secondsInput: ElementRef;

  // This is the index of the interval in the intervals array in the timer.
  @Input() index: number;

  @Input() interval: Interval;
  // This is the color of the interval name.
  // We do this so we can have the same colors for every interval that is named the same.
  // It is so we can show easily which intervals are the same.
  @Input() color: string;

  @Output() updateInterval = new EventEmitter<number>();
  @Output() duplicateInterval = new EventEmitter<number>();
  @Output() removeInterval = new EventEmitter<number>();

  hours = DEFAULT_TIME;
  minutes = DEFAULT_TIME;
  seconds = DEFAULT_TIME;

  private time = ['0', '0', '0', '0', '0', '0'];

  // Boolean value to tell whether the inputs were selected or not.
  private nameSelected = false;
  private durationSelected = false;

  private timeUtil = new Time();

  ngOnChanges(changes) {
    if (changes.interval !== undefined && changes.interval.currentValue !== undefined) {
      // Parses the time in to display in a human readable format
      this.timeUtil.parseTime(this.interval.duration);

      if (this.timeUtil.hours !== undefined) {
        this.hours = this.getTimeDigits(this.timeUtil.hours.toString());
      }

      if (this.timeUtil.minutes !== undefined) {
        this.minutes = this.getTimeDigits(this.timeUtil.minutes.toString());
      }

      if (this.timeUtil.seconds !== undefined) {
        this.seconds = this.getTimeDigits(this.timeUtil.seconds.toString());
      }
    }
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
   * Emits that the interval was updated.
   */
  onChange() {
    this.updateInterval.emit(this.index);
  }

  /**
   * Gets the digits for a specified time. We always want there to be a leading zero for time.
   *
   * @param time  The string time that is checking the digits.
   */
  getTimeDigits(time: string) {
    return time.length > 1 ? time : '0' + time;
  }

  /**
   * Checks to see if the value entered in the input is valid.
   *
   * @param event   The KeyboardEvent that references the keys that were pressed by the user.
   *
   * @return Boolean value on whether or not the key that was pressed was numberic.
   */
  isKeyAllowed(event: KeyboardEvent) {
    const charCode = event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== KeyCode.KEY_CODE_DELETE ||
        event.shiftKey ||
        event.altKey) {
      return false;
    }

    return true;
  }

  /**
   * Executes when the user changes the duration.
   *
   * @param event   The KeyboardEvent that references the keys that were pressed by the user.
   */
  onChangeDuration(event: KeyboardEvent) {
    const  maxTimeLength = 6;

    let tempArr = this.getTimeArray();

    switch (event.keyCode) {
        case KeyCode.KEY_CODE_BACKSPACE:
        case KeyCode.KEY_CODE_DELETE:
          // We create an array that is the exact number of missing indecies.
          // We always need 6 indices in the duration for it to display properly.
          const prefixArr = new Array(maxTimeLength - tempArr.length);
          // We set each index to be the default digit.
          prefixArr.fill(DEFAULT_TIME_DIGIT);

          // Concatenate the arrays.
          tempArr = prefixArr.concat(tempArr);

          break;
        default:
          const arrLength = tempArr.length;

          // We only want 6 indices in the array at a time, so we need to remove from the head since we are adding from the end.
          if (arrLength > maxTimeLength) {
            tempArr.splice(0, arrLength - maxTimeLength);
          } else if (arrLength < maxTimeLength) {
            // Add to the array since we selected both values and inserted 1 new one already.
            // We unshift to get back to 6 indices.
            tempArr.unshift(DEFAULT_TIME_DIGIT);
          }
          
          break;
      }

    this.time = tempArr;

    this.setTime();
  }

  /**
   * Function to tell whether the name input was selected.
   */
  onNameSelected() {
    this.nameSelected = true;
  }

  /**
   * Function to tell whether the name input was unselected.
   */
  onNameBlur() {
    this.nameSelected = false;
  }

    /**
   * Function to tell whether the duration input was selected.
   */
  onDurationSelected() {
    this.durationSelected = true;
  }

  /**
   * Function to tell whether the duration input was unselected.
   */
  onDurationBlur() {
    this.durationSelected = false;
  }

  /**
   * Focuses the hours input if there is a value in it.
   */
  focusHours() {
    if (this.isDurationEnabled(this.hours)) {
      this.hoursInput.nativeElement.focus();
    } else {
      this.focusMinutes();
    }
  }

  /**
   * Focuses the minutes input if there is a value in it.
   */
  focusMinutes() {
    if (this.isDurationEnabled(this.minutes)) {
      this.minutesInput.nativeElement.focus();
    } else {
      this.focusSeconds();
    }
  }

  /**
   * Focuses the seconds input.
   */
  focusSeconds() {
    this.secondsInput.nativeElement.focus();
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
    const hoursInSeconds = Math.floor(Number(this.hours) * 3600);
    const minutesInSeconds = Math.floor((Number(this.minutes) * 60));
    const seconds = Number(this.seconds);

    this.interval.duration = (hoursInSeconds + minutesInSeconds + seconds) * 1000;

    this.onChange();
  }

  /**
   * Gets the time array.
   */
  getTimeArray() {
    return this.hours.split('').concat(this.minutes.split('').concat(this.seconds.split('')));
  }

  /**
   * Checks to see if the interval has any values.
   */
  hasValues() {
    const name = this.interval.name;
    const duration = this.interval.duration;
    return (name !== undefined && name.trim() !== '') ||
           (duration !== undefined && duration > 0);
  }

  /**
   * Gets the class for the interval card that will change the way it is displayed to the user depending upon if there are values or not.
   *
   * @return The class for the mat card.
   */
  getMatCardClass() {
    let matClass = '';

    if (this.hasValues()) {
      matClass += Class.DIRTY + ' ';
    }

    if (this.nameSelected || this.durationSelected) {
      matClass += Class.ACTIVE + ' ';
    }

    return matClass;
  }

  /**
   * Gets the class for the hours depending upon if there are values or not.
   *
   * @return The class for the hours.
   */
  getHoursClass() {
    return this.getDurationEnablementClass(this.hours);
  }

  /**
   * Gets the class for the minutes depending upon if there are values or not.
   *
   * @return The class for the minutes.
   */
  getMinutesClass() {
    return this.getHoursClass() || this.getDurationEnablementClass(this.minutes);
  }

  /**
   * Gets the class for the seconds depending upon if there are values or not.
   *
   * @return The class for the seconds.
   */
  getSecondsClass() {
    return this.getMinutesClass() || this.getDurationEnablementClass(this.seconds);
  }

  /**
   * Gets the class for the duration enablement depending upon if there are values or not.
   *
   * @param model   The duration model to check if there is a value.
   *
   * @return The class for the duration.
   */
  getDurationEnablementClass(model: string) {
    return this.isDurationEnabled(model) ? Class.ACTIVE + ' ' : '';
  }

  /**
   * Checks to see if the duration is enabled or not.
   *
   * @param model   The duration model to check if there is a value.
   *
   * @return Boolean value for whether the duration input is enabled.
   */
  isDurationEnabled(model: string) {
    return model !== DEFAULT_TIME;
  }

  /**
   * Gets the class for the duration selection.
   *
   * @return The class for whether the duration is active or not.
   */
  getDurationSelectionClass() {
    return this.durationSelected ? Class.ACTIVE + ' ' : '';
  }

  /**
   * Checks to see if the interval has a color.
   */
  hasColor() {
    return this.color !== undefined;
  }
}

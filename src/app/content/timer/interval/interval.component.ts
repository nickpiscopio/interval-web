import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Interval } from './interval';
import { Class } from '../../../constant/class.constant';
import { Time } from '../../../utility/time.utility';

const KEY_CODE_BACKSPACE = 8;
const KEY_CODE_DELETE = 46;

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.sass']
})
export class IntervalComponent  implements OnInit {
  @ViewChild('hoursInput') hoursInput: ElementRef;
  @ViewChild('minutesInput') minutesInput: ElementRef;
  @ViewChild('secondsInput') secondsInput: ElementRef;

  // This is the index of the interval in the intervals array in the timer.
  @Input() index: number;

  @Input() interval: Interval;

  @Output() updateInterval = new EventEmitter<number>();
  @Output() duplicateInterval = new EventEmitter<number>();
  @Output() removeInterval = new EventEmitter<number>();

  private defaultTime = '00';
  private hours = this.defaultTime;
  private minutes = this.defaultTime;
  private seconds = this.defaultTime;

  private time = ['0','0','0','0','0','0'];

  // Boolean value to tell whether the input was selected or not.
  private selected = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    let timeUtil = new Time();
    timeUtil.parseTime(this.interval.duration);

    if (timeUtil.hours !== undefined) {
      this.hours = this.getTimeDigits(timeUtil.hours.toString());
    }

    if (timeUtil.minutes !== undefined) {
      this.minutes = this.getTimeDigits(timeUtil.minutes.toString());
    }

    if (timeUtil.seconds !== undefined) {
      this.seconds = this.getTimeDigits(timeUtil.seconds.toString());
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
   * Checks to see if the value entered in the input is numberic.
   * 
   * @param event   The KeyboardEvent that references the keys that were pressed by the user.
   * 
   * @return Boolean value on whether or not the key that was pressed was numberic.
   */
  isNumber(event: KeyboardEvent) {
    var charCode = event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
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
   * Function to tell whether the duration input was selected.
   */
  onSelect() {
    this.selected = true;
  }

  /**
   * Function to tell whether the duration input was unselected.
   */
  onBlur() {
    this.selected = false;
  }

  /**
   * Focuses the hours input if there is a value in it.
   */
  focusHours() {
    if (this.isDurationEnabled(this.hours)) {
      this.hoursInput.nativeElement.focus();
    } else {
      this.focusMinutes()
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
   * Gets the class for the interval card that will change the way it is displayed to the user depending upon if there are values or not.
   * 
   * @return The class for the mat card.
   */
  getMatCardClass() {
    return !this.hasValues() ? Class.INACTIVE + ' ': '';
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
    return this.getHoursClass && this.getDurationEnablementClass(this.minutes);
  }

  /**
   * Gets the class for the seconds depending upon if there are values or not.
   * 
   * @return The class for the seconds.
   */
  getSecondsClass() {
    return this.getDurationEnablementClass(this.minutes) && this.getDurationEnablementClass(this.seconds);
  }

  /**
   * Gets the class for the duration enablement depending upon if there are values or not.
   * 
   * @param model   The duration model to check if there is a value.
   * 
   * @return The class for the duration.
   */
  getDurationEnablementClass(model: string) {
    return this.isDurationEnabled(model) ? '' : Class.INACTIVE + ' ';
  }

  /**
   * Checks to see if the duration is enabled or not.
   * 
   * @param model   The duration model to check if there is a value.
   * 
   * @return Boolean value for whether the duration input is enabled.
   */
  isDurationEnabled(model: string) {
    return model !== this.defaultTime
  }

  /**
   * Gets the class for the duration selection.
   * 
   * @return The class for whether the duration is active or not.
   */
  getDurationSelectionClass() {
    return this.selected ? Class.ACTIVE + ' ' : '';
  }
}

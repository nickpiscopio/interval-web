import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Interval } from './interval';
import { Class } from '../../../constant/class.constant';

const KEY_CODE_BACKSPACE = 8;

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

  private hours = '';
  private minutes = '';
  private seconds = '';
  private second1 = '';

  private time = ['0','0','0','0','0','0'];

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

  getValue(index: number) {
    return this.time[index];
  }

  getModel(index: number) {

  }

  validate(evt) {
    var theEvent = evt || window.event;
  
    // Handle paste
    // if (theEvent.type === 'paste') {
    //     key = event.clipboardData.getData('text/plain');
    // } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    // }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  onChangeDuration(index: number) {
    // This is the value at the index that was changed.
    // We need to send this to the new index, and remove this to the index above.
    let val0 = this.time[index][0];
    let val1 = this.time[index][1];

    if (val0 !== undefined && val1 !== undefined) {
      this.time.splice(index+1, 0, val0)
      this.time.splice(index+2, 0, val1)
  
      // Remove the first inex because we don't need it anymore.
      this.time.shift();
      this.time.shift();
    }
  }

  // onChangeSeconds() {
    // this.hours = Math.floor(this.hours * 3600);
    // this.minutes = Math.floor(this.minutes * 60);

    // this.interval.duration -= this.seconds * 1000;
    // let time = this.interval.duration / 1000;

    // let hours = Math.floor(time / 3600);
    // let minutes = Math.floor((time % 3600) / 60);

    // this.parseTime(hours + minutes + this.seconds)

    // if (this.seconds.length > 2) {
    //   this.
    // }
  // }

  parseTime(time: number) {
    // if (time > 0) {
    //   this.hours = Math.floor(time / 3600);
    //   this.minutes = Math.floor((time % 3600) / 60);
    //   this.seconds = Math.floor((time % 3600) % 60);

    //   this.interval.duration = time * 1000
    // }   
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

  onChangeSeconds(event: KeyboardEvent) {
    console.log('$event:', event);
    console.log('seconds 1:', this.seconds);

    let val = Number(event.key);
    let keyCode = Number(event.keyCode);

    if (!isNaN(val) || keyCode === KEY_CODE_BACKSPACE) {
      switch(keyCode) {
        case KEY_CODE_BACKSPACE:
          // Adds a 0 to the first index because we removed the last index.
          // There always needs to be 6 indexes to have this work properly.
          this.time.unshift("0");

          // We are only allowed to have 6 indexs in time, so we remove the other ones from the end of the array.
          this.time.pop();
          
          break;
        default:
          // Add the key that was pressed to the time array.
          this.time.push(val.toString());

          // We are only allowed to have 6 indexs in time, so we remove the other ones from the beginning of the array.
          this.time.splice(0, this.time.length - 6);
          
          break;
      }

      
  
      let secs = this.time[4] + this.time[5];
      let mins = this.time[2] + this.time[3];
      let hrs = this.time[0] + this.time[1];
  
      this.seconds = secs;
      this.minutes = mins;
      this.hours = hrs;
    }   
  }
}

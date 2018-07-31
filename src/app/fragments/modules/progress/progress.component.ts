import {Component, Input} from '@angular/core';
import {Class} from '../../../constant/class.constant';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.sass']
})
export class ProgressComponent {
  @Input() showProgress: boolean;
  @Input() center: boolean;

  strokeWidth = 2;
  diameter = 26;

  /**
   * Gets the class for the progress bar.
   *
   * @returns {string}  The class for the progress bar.
   */
  getClass() {
    return this.center ? Class.CENTER : '';
  }
}

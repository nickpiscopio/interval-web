import {Dialog} from './dialog.model';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent {
  dialog: Dialog;

  /**
   * The constructor for the dialog component.
   *
   * @param {Dialog} data   The dialog model.
   */
  constructor(@Inject(MAT_DIALOG_DATA) data: Dialog) {
    this.dialog = data;
  }

  /**
   * Returns whether the message should be shown.
   *
   * @returns {boolean} Boolean value for whether the message should be shown.
   */
  showMessage() {
    const message = this.dialog.message;
    return message !== null && message !== '';
  }

  /**
   * Returns whether the negative button should be shown.
   *
   * @returns {boolean}   Boolean value for whether the negative button should be shown.
   */
  showNegativeButton() {
    const negativeButton = this.dialog.negativeButton;
    return negativeButton !== null && negativeButton !== '';
  }

  /**
   * Returns whether the positive button should be shown.
   *
   * @returns {boolean}   Boolean value for whether the positive button should be shown.
   */
  showPositiveButton() {
    const positiveButton = this.dialog.positiveButton;
    return positiveButton !== null && positiveButton !== '';
  }
}

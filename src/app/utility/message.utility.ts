import {Dialog} from '../fragments/dialog/dialog/dialog.model';
import {DialogComponent} from '../fragments/dialog/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

export class MessageUtility {
  public static readonly OK = 'OK';

  constructor(private dialog: MatDialog) { }

  /**
   * Opens a new dialog.
   *
   * @param {string} title            The title that should be displayed in the dialog.
   * @param {string} message          The message that should be displayed in the dialog.
   * @param {string} negativeButton   (optional) The negative button that should be displayed in the dialog.
   * @param {string} positiveButton   (optional) The positive button that should be displayed in the dialog.
   *
   * @returns {MatDialogRef<DialogComponent>} The reference to the dialog.
   */
  openDialog(title: string, message: string, negativeButton: string, positiveButton: string) {
    return this.dialog.open(DialogComponent, {
      data: new Dialog(title, message, negativeButton, positiveButton)
    });
  }
}

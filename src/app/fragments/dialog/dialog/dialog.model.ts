export class Dialog {
  /**
   * The constructor for the dialog model.
   *
   * @param {string} title            The title that should be displayed in the dialog.
   * @param {string} message          (optional) The message that should be displayed in the dialog.
   * @param {string} negativeButton   (optional) The negative button that should be displayed in the dialog.
   * @param {string} positiveButton   (optional) The positive button that should be displayed in the dialog.
   */
  constructor(public title: string, public message: string, public negativeButton: string, public positiveButton: string) { }
}

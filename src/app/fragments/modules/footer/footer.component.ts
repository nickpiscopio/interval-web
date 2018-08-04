import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {TermsDialogComponent} from '../../dialog/terms/terms.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
  @Input() includeTerms = true;
  // Emitter to emit when the visibility of the terms has changed.
  @Output() termsVisibilityChanged = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog) {}

  /**
   * Opens the terms dialog.
   */
  openTerms() {
    // Emit that the terms dialog is visible.
    this.termsVisibilityChanged.emit(true);

    this.dialog.open(TermsDialogComponent).afterClosed().subscribe(() => {
      // Emit that the terms dialog is not visible anymore.
      this.termsVisibilityChanged.emit(false);
    });
  }
}

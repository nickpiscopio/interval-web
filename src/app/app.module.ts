import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Libraries
// Documentation: https://github.com/valor-software/ng2-dragula
import { DragulaModule } from 'ng2-dragula';
import { ClipboardModule } from 'ngx-clipboard';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Router
import { routes } from './app.router';

// Components
import { AppComponent } from './app.component';
import { WelcomeComponent } from './fragments/content/welcome/welcome.component';
import { TimerComponent } from './fragments/content/timer/timer-run/timer-run.component';
import { TimerCreateComponent } from './fragments/content/timer/timer-create/timer-create.component';
import { FooterComponent } from './fragments/modules/footer/footer.component';
import { IntervalCreateComponent } from './fragments/content/timer/interval/item-create/interval.component';
import { IntervalDisplayComponent } from './fragments/content/timer/interval/item-display/interval.component';
import { ClockDisplayComponent } from './fragments/modules/clock-display/clock-display.component';
import { LoadingComponent } from './fragments/modules/loading/loading.component';
import { ProgressComponent } from './fragments/modules/progress/progress.component';

// Dialogs
import { DialogComponent } from './fragments/dialog/dialog/dialog.component';
import { ShareComponent } from './fragments/dialog/share/share.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TimerComponent,
    TimerCreateComponent,
    FooterComponent,
    IntervalCreateComponent,
    IntervalDisplayComponent,
    ClockDisplayComponent,
    LoadingComponent,
    ProgressComponent,
    DialogComponent,
    ShareComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DragulaModule.forRoot(),
    ClipboardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    routes
  ],
  entryComponents: [
    DialogComponent,
    ShareComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Documentation on how to use fontawesome: https://stackoverflow.com/questions/38796541/how-to-add-font-awesome-to-angular-2-cli-project
  // Scroll to 'There are 3 parts to using Font-Awesome in Angular Projects'
  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}

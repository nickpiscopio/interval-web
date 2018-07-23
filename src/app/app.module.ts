import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Libraries
// Documentation: https://github.com/valor-software/ng2-dragula
import { DragulaModule } from 'ng2-dragula';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Router
import { routes } from './app.router';

// Components
import { AppComponent } from './app.component';
import { WelcomeComponent } from './content/welcome/welcome.component';
import { TimerComponent } from './content/timer/timer-run/timer-run.component';
import { TimerCreateComponent } from './content/timer/timer-create/timer-create.component';
import { FooterComponent } from './fragments/footer/footer.component';
import { IntervalCreateComponent } from './content/timer/interval/item-create/interval.component';
import { IntervalDisplayComponent } from './content/timer/interval/item-display/interval.component';
import { ClockDisplayComponent } from './fragments/clock-display/clock-display.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TimerComponent,
    TimerCreateComponent,
    FooterComponent,
    IntervalCreateComponent,
    IntervalDisplayComponent,
    ClockDisplayComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    DragulaModule.forRoot(),
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxMaskModule } from 'ngx-mask'
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './content/welcome/welcome.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.router';
import { TimerComponent } from './content/timer/timer-run/timer-run.component';
import { TimerCreateComponent } from './content/timer/timer-create/timer-create.component';
import { FooterComponent } from './fragments/footer/footer.component';
import { IntervalComponent } from './content/timer/interval/interval.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, TimerComponent, TimerCreateComponent, FooterComponent, IntervalComponent],
  imports: [CommonModule,
            BrowserModule,
            FormsModule,
            TextMaskModule,
            NgxMaskModule.forRoot(),
            MatButtonModule,
            MatCardModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatMenuModule,
            BrowserAnimationsModule,
            routes],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

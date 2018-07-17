import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './content/welcome/welcome.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.router';
import { TimerComponent } from './content/timer/timer.component';
import { TimerCreateComponent } from './content/timer-create/timer-create.component';
import { FooterComponent } from './fragments/footer/footer.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, TimerComponent, TimerCreateComponent, FooterComponent],
  imports: [CommonModule, BrowserModule, FormsModule, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, BrowserAnimationsModule, routes],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

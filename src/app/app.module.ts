import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.router';
import { TimerComponent } from './components/timer/timer.component';
import { TimerCreateComponent } from './components/timer-create/timer-create.component';
import { FooterComponent } from './fragments/footer/footer.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, TimerComponent, TimerCreateComponent, FooterComponent],
  imports: [CommonModule, BrowserModule, MatButtonModule, MatIconModule, BrowserAnimationsModule, routes],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

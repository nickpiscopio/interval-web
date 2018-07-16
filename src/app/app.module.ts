import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { routes } from './app.router';
import { TimerComponent } from './components/timer/timer.component';
import { TimerCreateComponent } from './components/timer-create/timer-create.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, TimerComponent, TimerCreateComponent],
  imports: [BrowserModule, routes],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

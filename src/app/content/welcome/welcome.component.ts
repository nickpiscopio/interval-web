import { Component, AfterContentInit } from '@angular/core';
import { Route } from '../../constant/route.constant';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { Router } from '../../../../node_modules/@angular/router';
import { Class } from '../../constant/class.constant';

const THRESHOLD_SHOW_BUTTON = 550;

const STATE_IS_SHOWN = 'true';
const STATE_ISNT_SHOWN = 'false';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass'],
  animations: [
    trigger('titleAnimation', [
      state(STATE_IS_SHOWN, style({ transform: 'translateY(0)' })),
      state(STATE_ISNT_SHOWN, style({ transform: 'translateY(50%)' })),
      transition(STATE_IS_SHOWN + ' <=> ' + STATE_ISNT_SHOWN, animate(THRESHOLD_SHOW_BUTTON / 2))
    ])
  ]
})
export class WelcomeComponent implements AfterContentInit {
  slideTitle = false;

  buttonClass: string;

  constructor(private router: Router) {}

  ngAfterContentInit() {
    // We want to show the button after a certain threshold.
    setTimeout(() => {
      this.slideTitle = true;
      this.buttonClass = Class.ACTIVE;
    }, THRESHOLD_SHOW_BUTTON);
  }

  /**
   * Navigates to the create timer screen.
   */
  navigateToCreateTimer() {
    this.router.navigate([Route.INTERNAL_ROUTE_TIMER_CREATE]);
  }

  /**
   * Gets the button class to display the button with animations.
   */
  getButtonClass() {
    return this.buttonClass;
  }
}

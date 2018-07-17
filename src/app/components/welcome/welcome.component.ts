import { Component, AfterContentInit } from '@angular/core';
import { Route } from '../../constant/route.constant';
import { trigger, style, transition, animate, state } from '@angular/animations';

const THRESHOLD_SHOW_BUTTON = 1000;
const THRESHOLD_ANIMATION_CREATE_BUTTON = 800;
const THRESHOLD_ANIMATION_TITLE = 300;

const STATE_IS_SHOWN = 'true';
const STATE_ISNT_SHOWN = 'false';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass'],
  animations: [
    trigger('buttonAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate(THRESHOLD_ANIMATION_CREATE_BUTTON, style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate(THRESHOLD_ANIMATION_CREATE_BUTTON, style({ opacity: 0 }))])
    ]),
    trigger('titleAnimation', [
      state(STATE_IS_SHOWN, style({ transform: 'translateY(0)' })),
      state(STATE_ISNT_SHOWN, style({ transform: 'translateY(22%)' })),
      transition(STATE_IS_SHOWN + ' <=> ' + STATE_ISNT_SHOWN, animate(THRESHOLD_ANIMATION_TITLE))
    ])
  ]
})
export class WelcomeComponent implements AfterContentInit {
  showButton = false;

  ngAfterContentInit() {
    // We want to show the button after a certain threshold.
    setTimeout(() => {
      this.showButton = true;
    }, THRESHOLD_SHOW_BUTTON);
  }

  /**
   * Gets the create timer route.
   *
   * @returns {string}  The create timer route.
   */
  getCreateTimerRoute() {
    return Route.INTERNAL_ROUTE_TIMER_CREATE;
  }
}

import { Component, AfterContentInit } from '@angular/core';
import { Route } from '../../../constant/route.constant';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { Router } from '@angular/router';
import { Class } from '../../../constant/class.constant';
import {TermsDialogComponent} from '../../dialog/terms/terms.component';
import {MatDialog} from '@angular/material';
import {MetaUtility} from '../../../utility/meta.utility';
import {Meta} from '@angular/platform-browser';

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
      state(STATE_ISNT_SHOWN, style({ transform: 'translateY(22%)' })),
      transition(STATE_IS_SHOWN + ' <=> ' + STATE_ISNT_SHOWN, animate(THRESHOLD_SHOW_BUTTON / 2))
    ])
  ]
})
export class WelcomeComponent implements AfterContentInit {
  slideTitle = false;

  buttonClass: string;

  constructor(private router: Router, private dialog: MatDialog, private meta: Meta) {
    // Adds the meta data tags to each page that has a timer.
    // This is for social media cards.
    new MetaUtility(this.meta).addProperties();
  }

  ngAfterContentInit() {
    // We want to show the button after a certain threshold.
    setTimeout(() => {
      this.slideTitle = true;
      this.buttonClass = Class.ACTIVE;
    }, THRESHOLD_SHOW_BUTTON);
  }

  /**
   * Opens the terms dialog.
   */
  openTerms() {
    this.dialog.open(TermsDialogComponent);
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

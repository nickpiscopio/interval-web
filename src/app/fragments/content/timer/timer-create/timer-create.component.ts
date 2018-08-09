import {Component, ViewChild, NgZone, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Timer } from '../timer';
import { Route } from '../../../../constant/route.constant';
import { Color } from '../../../../utility/color.utility';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ShareComponent } from '../../../dialog/share/share.component';
import {HttpClient} from '@angular/common/http';
import {ApiUtility} from '../../../../utility/api.utility';
import {UrlUtility} from '../../../../utility/url.utility';
import {fade} from '../../../../animations/fade';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';
import {Meta} from '@angular/platform-browser';

// This is the group to allow reordering intervals by dragging.
const GROUP_INTERVALS = 'intervals';
const CLASS_NAME_DRAGGABLE = 'icon-drag';
const CLASS_NAME_DRAGGABLE_2 = 'indicator';

@Component({
  selector: 'app-timer-create',
  templateUrl: './timer-create.component.html',
  styleUrls: ['./timer-create.component.sass'],
  animations: [fade]
})
export class TimerCreateComponent implements OnDestroy {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  timer: Timer;

  // Boolean value to tell whether the timer is loading or not.
  isLoading = false;

  color: Color;

  private apiUtility: ApiUtility;

  // RxJS Subscription managing many unsubscribe calls.
  private subs = new Subscription();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ngZone: NgZone,
              private dialog: MatDialog,
              private http: HttpClient,
              private dragulaService: DragulaService,
              private meta: Meta) {

    this.isLoading = true;

    this.apiUtility = new ApiUtility(this.http);

    this.color = new Color();

    new UrlUtility(route, http, meta).getTimer((timer) => {
      if (timer !== undefined) {
        this.timer = timer;

        const intervals = this.timer.intervals;
        const length = intervals.length;
        for (let i = 0; i < length; i++) {
          // Generate a color for each interval since we start off with intervals.
          this.color.generateColor(intervals[i].name);
        }

        // We add an interval here because we always want at least 1.
        this.timer.addDefaultInterval();
      } else {
        this.timer = new Timer('', []);

        // We add an interval here because we always want at least 1.
        this.timer.addDefaultInterval();
      }

      this.isLoading = false;
    });

    this.initDragula();
  }

  ngOnDestroy() {
    // destroy all the subscriptions at once
    this.subs.unsubscribe();

    // Destroy the interval group because we left the page.
    this.dragulaService.destroy(GROUP_INTERVALS);
  }

  /**
   * Initializes Dragula.
   */
  initDragula() {
    let scrollable = true;

    const listener = function(e) {
      if (!scrollable) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', listener, { passive: false });

    // Only move the interval when using the movable indicator.
    this.dragulaService.createGroup(GROUP_INTERVALS, {
      moves: (el, container, handle) => {
        return handle.classList.contains(CLASS_NAME_DRAGGABLE) ||
          handle.classList.contains(CLASS_NAME_DRAGGABLE_2);
      }
    });

    this.subs.add(this.dragulaService.drag(GROUP_INTERVALS)
      .subscribe(({ name, el, source }) => {
        scrollable = false;
      })
    );

    this.subs.add(this.dragulaService.drop(GROUP_INTERVALS)
      .subscribe(({ name, el, source }) => {
        scrollable = true;
      })
    );

    this.subs.add(this.dragulaService.dragend(GROUP_INTERVALS)
      .subscribe(({ name, el }) => {
        scrollable = true;
      })
    );
  }

  /**
   * Triggers a resize of the textarea if needed.
   */
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  /**
   * Duplicates an interval and places it at the lat index.
   *
   * @param index   The index of the interval to duplicate.
   */
  duplicateInterval(index: number) {
    // We need to convert the index to a number because an event will send it as a string.
    this.timer.duplicateInterval(Number(index));
  }

/**
   * Updates a soecified interval.
   *
   * @param index   The index of the interval that was updated.
   */
  updateInterval(index: number) {
    // We need to convert the index to a number because an event will send it as a string.
    index = Number(index);

    this.color.generateColor(this.timer.intervals[index].name);

    this.timer.updateInterval(index);
  }

  /**
   * Removes and interval at a specifed index.
   *
   * @param index   The interval index to remove.
   */
  removeInterval(index: number) {
    // We need to convert the index to a number because an event will send it as a string.
    this.timer.removeIntervalAndCalculateDuration(Number(index));
  }

  /**
   * Opens the share dialog.
   */
  displayShareDialog() {
    this.dialog.open(ShareComponent, {
      data: { timer: this.timer, message: '' }
    }).afterClosed().subscribe(() => {
      // We add an interval here because we always want at least 1.
      // We finalized the intervals when we shared.
      this.timer.addDefaultInterval();
    });
  }

  /**
   * Starts the timer.
   */
  start() {
    let timer = JSON.stringify(this.timer);
    console.log('Timer: ', timer);

    this.apiUtility.storeTimer(this.timer, (data) => {
      if (data !== undefined) {
        const id = data.id;
        if (id !== undefined) {
          timer = id;
        }
      }

      this.router.navigate([Route.getTimerRoute(timer, true)]);
    });
  }

  /**
   * Gets the total intervals from the timer.
   */
  getTotalIntervals() {
    return this.timer.getTotalIntervals();
  }

  /**
   * Checks to make sure the timer has intervals.
   *
   * This function is different than isValidTimer() because the intervals.length is checked
   * to display the intervals to the user regardless of if they are valid intervals or not.
   */
  hasIntervals() {
    return this.timer !== undefined && this.timer.intervals !== undefined && this.timer.intervals.length > 0;
  }

  /**
   * Checks to make sure the timer has valid intervals to enable or disable the start button.
   *
   * This function is different than hasIntervals() because the hasIntervals()
   * returns true even if all the intervals have 0 seconds as their duration.
   * That is fine for that function, but that doesn't mean the timer is valid.
   */
  isValidTimer() {
    return this.getTotalIntervals() > 0;
  }
}

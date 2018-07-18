import { trigger, animate, transition, style } from '@angular/animations';

const ANIMATION_THRESHOLD = 250;

export const fade = trigger('fade', [
  transition(':enter', [style({ opacity: 0 }), animate(ANIMATION_THRESHOLD, style({ opacity: 1 }))]),
  transition(':leave', [style({ opacity: 1 }), animate(ANIMATION_THRESHOLD, style({ opacity: 0 }))])
]);

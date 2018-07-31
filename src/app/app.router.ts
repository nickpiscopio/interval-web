import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from './constant/route.constant';
import { WelcomeComponent } from './fragments/content/welcome/welcome.component';
import { TimerCreateComponent } from './fragments/content/timer/timer-create/timer-create.component';
import { TimerComponent } from './fragments/content/timer/timer-run/timer-run.component';

const appRoutes: Routes = [
  { path: Route.INTERNAL_WELCOME, component: WelcomeComponent },
  { path: Route.INTERNAL_ROUTE_TIMER_CREATE, component: TimerCreateComponent },
  { path: Route.INTERNAL_ROUTE_TIMER_RUN, component: TimerComponent },

  // Redirect home if the route isn't found.
  { path: '**', redirectTo: Route.INTERNAL_WELCOME }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);

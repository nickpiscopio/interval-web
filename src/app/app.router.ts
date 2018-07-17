import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from './constant/route.constant';
import { WelcomeComponent } from './content/welcome/welcome.component';
import { TimerCreateComponent } from './content/timer-create/timer-create.component';
import { TimerComponent } from './content/timer/timer.component';

const appRoutes: Routes = [
  { path: Route.INTERNAL_WELCOME, component: WelcomeComponent },
  { path: Route.INTERNAL_TIMER, component: TimerComponent },
  { path: Route.INTERNAL_ROUTE_TIMER_CREATE, component: TimerCreateComponent },

  // Redirect home if the route isn't found.
  { path: '**', redirectTo: Route.INTERNAL_WELCOME }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);

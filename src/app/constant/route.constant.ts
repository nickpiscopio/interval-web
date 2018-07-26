export class Route {
  public static readonly DOMAIN = window.location.hostname + ":4200/";
  // Internal routes.
  private static readonly ROOT = '/';
  private static readonly PREFIX_PARAM = ':';

  public static readonly INTERNAL_WELCOME = '';
  private static readonly INTERNAL_TIMER = 'timer';
  public static readonly INTERNAL_TIMER_SUFFIX = Route.ROOT + 'run';

  public static readonly INTERNAL_TIMER_PARAM = 'timer';

  private static readonly INTERNAL_ROUTE_TIMER = Route.getTimerRoute(Route.PREFIX_PARAM + Route.INTERNAL_TIMER_PARAM, false);

  public static readonly INTERNAL_ROUTE_TIMER_CREATE = Route.INTERNAL_ROUTE_TIMER;
  public static readonly INTERNAL_ROUTE_TIMER_RUN = Route.INTERNAL_ROUTE_TIMER + Route.INTERNAL_TIMER_SUFFIX;

  /**
   * Gets the timer route.
   *
   * @param timer   The string represented timer.
   * @param toRun   Boolean value on whether we want to run the timer.
   */
  static getTimerRoute(timer: string, toRun: boolean) {
    let route = Route.INTERNAL_TIMER + Route.ROOT + timer;

    if (toRun) {
      route += Route.INTERNAL_TIMER_SUFFIX;
    }

    return route;
  }
}

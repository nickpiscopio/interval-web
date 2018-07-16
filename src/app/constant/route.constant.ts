export class Route {
  // Internal routes.
  private static readonly ROOT = '/';

  public static readonly INTERNAL_WELCOME = '';
  public static readonly INTERNAL_TIMER = 'timer';

  private static readonly INTERNAL_CREATE = 'create';

  public static readonly INTERNAL_ROUTE_TIMER_CREATE = Route.INTERNAL_TIMER + Route.ROOT + Route.INTERNAL_CREATE;
}

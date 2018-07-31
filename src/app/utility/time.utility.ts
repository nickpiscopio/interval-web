export class Time {
  public static readonly SECOND = 1000;

  public hours;
  public minutes;
  public seconds;

  /**
   * Parses the time in to display in a human readable format.
   *
   * @return The time in seconds or a message saying the timer is finished.
   */
  parseTime(time: number) {
    if (time > 0) {
      // This is the time left in seconds.
      const timeInSeconds = time / Time.SECOND;

      this.hours = Math.floor(timeInSeconds / 3600);
      this.minutes = Math.floor((timeInSeconds % 3600) / 60);
      this.seconds = Math.floor((timeInSeconds % 3600) % 60);
    } else {
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
    }
  }
}

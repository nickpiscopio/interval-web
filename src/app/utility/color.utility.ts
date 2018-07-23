export class Color {
   // This is an object of colors for each interval.
  // We use this to easily show which intervals are the same.
  public intervalColors = {};

  /**
   * Generates a color for an interval and stores it in the object.
   * 
   * @param intervalName  The interval name to retrieve the color.
   */
  generateColor(intervalName: string) {
    // We don't care about case when storing the color.
    intervalName = intervalName.toLowerCase();
    // Only add a new color if there isn't one already.
    if (this.intervalColors[intervalName] === undefined) {  
      // We set a min and a max so the colors aren't too light or too dark.
      let min = 25;
      let max = 231;
      // Generate a random color and assign it to the interval name.
      // We do this so we can change the color of the interval to easily see which intervals are the same.
      this.intervalColors[intervalName] = 'rgb(' + this.getRandomInt(min, max) + ',' + this.getRandomInt(min, max) + ',' + this.getRandomInt(min, max) + ')';
    }
  }

  /**
   * Gets the hex color for the associated interval name.
   * 
   * @param intervalName  The interval name to retrieve the color.
   */
  getIntervalColor(intervalName: string) {
    // We don't care about case when storing the color.
    intervalName = intervalName.toLowerCase();
    return this.intervalColors[intervalName];
  }
  
  /**
   * Returns a random integer between two numbers.
   * 
   * @param min   The minimum number allowed for the random number.
   * @param max   The maximum number allowed for the random number.
   * 
   * @return The random number.
   */
  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

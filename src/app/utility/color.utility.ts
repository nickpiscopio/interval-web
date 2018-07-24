export class Color {
   // This is an object of colors for each interval.
  // We use this to easily show which intervals are the same.
  public intervalColors = {};

  private approvedColors = [
    "#283747",
    "#e67e22",
    "#f1c40f",
    "#27ae60",
    "#1abc9c",
    "#2980b9",
    "#9b59b6",
    "#34495e",
    "#af601a",
    "#b7950b",
    "#1e8449",
    "#148f77",
    "#1f618d",
    "#76448a",
    "#922b21"
  ];

  /**
   * Generates a color for an interval and stores it in the object.
   * 
   * @param intervalName  The interval name to retrieve the color.
   */
  generateColor(intervalName: string) {
    // We don't care about case when storing the color.
    intervalName = intervalName.toLowerCase().trim();
    // Only add a new color if the interval name exists and if there isn't a color associated with it already.
    if (intervalName !== undefined && intervalName.length > 0 &&
        this.intervalColors[intervalName] === undefined) {
      let color;
      
      let approveColorLength = this.approvedColors.length;
      if (approveColorLength !== undefined && approveColorLength > 0) {
        color = this.approvedColors[0];
        // Remove the first index because we don't want to use it again.
        this.approvedColors.shift();
      } else {
        // We set a min and a max so the colors aren't too light or too dark.
        let min = 25;
        let max = 231;
        // Generate a random color and assign it to the interval name.
        // We do this so we can change the color of the interval to easily see which intervals are the same.
        color = 'rgb(' + this.getRandomInt(min, max) + ',' + this.getRandomInt(min, max) + ',' + this.getRandomInt(min, max) + ')'
      }

      this.intervalColors[intervalName] = color;
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

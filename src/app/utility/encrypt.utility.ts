export class EncryptUtility {
  /**
   * Uses the standard base64 library to encode a raw string.
   *
   * @param {string} raw  The raw value to encode.
   *
   * @returns {string}  The encoded string.
   */
  public static encode(raw: string) {
    return btoa(raw);
  }

  /**
   * Uses the standard base64 library to decode an encoded string.
   *
   * @param {string} encodedString  The string to decode.
   *
   * @returns {string}  The decoded string.
   */
  public static decode(encodedString: string) {
    return atob(encodedString);
  }
}

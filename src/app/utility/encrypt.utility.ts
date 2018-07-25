import * as lzjs from 'lzjs';

export class EncryptUtility {
  /**
   * Uses the standard base64 library to encode a raw string.
   *
   * @param {string} raw  The raw value to encode.
   *
   * @returns {string}  The encoded string.
   */
  public static encode(raw: string) {
    let encoded = lzjs.compressToBase64(raw).replace(/\//g, "%2F").replace(/=/g, "%3D");
    return encoded;
  }

  /**
   * Uses the standard base64 library to decode an encoded string.
   *
   * @param {string} encodedString  The string to decode.
   *
   * @returns {string}  The decoded string.
   */
  public static decode(encodedString: string) {
    let decodedString = lzjs.decompressFromBase64(encodedString);

    return decodedString;
  }
}

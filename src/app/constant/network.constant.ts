export class Network {
  public static readonly IP = '127.0.0.1';
  public static readonly PORT = '8000';

  public static readonly URL_SERVICES = 'http://' + Network.IP + ':' + Network.PORT;

  // This is the URL that is for sharing.
  // We are putting it here just in case it needs to be changed easily.
  public static readonly URL_DISPLAY = 'http://interval.intencity.fit';
}

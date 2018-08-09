import {Meta} from '@angular/platform-browser';

export class MetaUtility {
  private meta: Meta;

  private author = 'Interval Fitness Timer';
  private name = this.author;
  private url = 'http://interval.intencity.fit';
  private copyrightDate = '2018';
  private rights = '&copy; ' + this.copyrightDate + ' All Rights Reserved. Interval.Intencity.fit';

  private description = 'Interval: High intensity interval training timer by Intencity.';
  private image = 'http://interval.intencity.fit/assets/images/logo_social.jpg';

  constructor(meta: Meta, name?: string, url?: string) {
    this.meta = meta;

    if (name !== undefined && name.trim() !== '') {
      this.name = name;
    }

    if (url !== undefined  && url.trim() !== '') {
      this.url = url;
    }
  }

  /**
   * Adds meta data properties.
   */
  addProperties() {
    // Schema.org markup for Google+
    this.addItemPropTag('name', this.name);
    this.addItemPropTag('description', this.description);
    this.addItemPropTag('image', this.image);

    // Facebook
    this.addPropertyTag('og:title', this.name);
    this.addPropertyTag('og:url', this.url);
    this.addPropertyTag('og:image', this.image);
    this.addPropertyTag('og:description', this.description);

    // Twitter
    this.addNameTag('twitter:card', 'summary');
    this.addNameTag('twitter:title', this.name);
    this.addNameTag('twitter:description', this.description);
    // Twitter Summary card images must be at least 120x120px
    this.addNameTag('twitter:image', this.image);

    // Legal
    this.addNameTag('author', this.author);
    this.addNameTag('description', this.description);
    this.addNameTag('dcterms.rights', this.rights);
    this.addNameTag('dcterms.dateCopyrighted', this.copyrightDate);
  }

  /**
   * Adds a tag with an itemprop.
   *
   * @param property  The name of the property to set.
   * @param content   The content of the property to set.
   */
  private addItemPropTag(property: string, content: string) {
    this.meta.addTag({ itemprop: property, content: content });
  }

  /**
   * Adds a tag with a property.
   *
   * @param property  The name of the property to set.
   * @param content   The content of the property to set.
   */
  private addPropertyTag(property: string, content: string) {
    this.meta.addTag({ property: property, content: content });
  }

  /**
   * Adds a tag with a name.
   *
   * @param property  The name of the property to set.
   * @param content   The content of the property to set.
   */
  private addNameTag(property: string, content: string) {
    this.meta.addTag({ name: property, content: content });
  }
}

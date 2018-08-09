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
  updateMetaProperties() {
    // Schema.org markup for Google+
    this.updateItemPropTag('name', this.name);
    this.updateItemPropTag('description', this.description);
    this.updateItemPropTag('image', this.image);

    // Facebook
    this.updatePropertyTag('og:title', this.name);
    this.updatePropertyTag('og:url', this.url);
    this.updatePropertyTag('og:image', this.image);
    this.updatePropertyTag('og:description', this.description);

    // Twitter
    this.updateNameTag('twitter:card', 'summary');
    this.updateNameTag('twitter:title', this.name);
    this.updateNameTag('twitter:description', this.description);
    // Twitter Summary card images must be at least 120x120px
    this.updateNameTag('twitter:image', this.image);

    // Legal
    this.updateNameTag('author', this.author);
    this.updateNameTag('description', this.description);
    this.updateNameTag('dcterms.rights', this.rights);
    this.updateNameTag('dcterms.dateCopyrighted', this.copyrightDate);
  }

  /**
   * Updates a tag with a specified itemprop.
   *
   * @param property  The name of the property to set.
   * @param content   The content of the property to set.
   */
  private updateItemPropTag(property: string, content: string) {
    this.meta.updateTag({ itemprop: property, content: content });
  }

  /**
   * Updates a tag with a specified property.
   *
   * @param property  The name of the property to set.
   * @param content   The content of the property to set.
   */
  private updatePropertyTag(property: string, content: string) {
    this.meta.updateTag({ property: property, content: content });
  }

  /**
   * Updates a tag with a specified name.
   *
   * @param property  The name of the property to set.
   * @param content   The content of the property to set.
   */
  private updateNameTag(property: string, content: string) {
    this.meta.updateTag({ name: property, content: content });
  }
}

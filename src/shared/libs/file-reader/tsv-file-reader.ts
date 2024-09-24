import {IFileReader} from './file-reader.interface.js';
import {OfferType, LocationType, OfferTypeEnum, FeaturesTypeEnum} from '#shared/types/entities.types.js';
import {readFileSync} from 'node:fs';
import chalk from 'chalk';

export class TVSFileReader implements IFileReader {
  private rawData = '';

  constructor(private readonly fileName: string) {}

  private validateRowData(): void {
    if (!this.rawData) {
      throw new Error(chalk.bgRed.bold('File was not read'));
    }
  }

  private parseRawDataToOffers(): OfferType[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((row) => this.parseLineToOffer(row));
  }

  private parseLineToOffer(row: string): OfferType {
    const [
      title,
      description,
      postDate,
      city,
      cityLocation,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      hostType,
      rooms,
      quests,
      price,
      features,
      userName,
      avatarUrl,
      password,
      isPro,
      email,
      location,
      comments
    ] = row.split('\t');

    return {
      title,
      description,
      date: new Date(postDate),
      city: { name: city, location: this.parseLocation(cityLocation)},
      previewImage,
      images: images.split(';'),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: isFavorite === 'true',
      rating: parseInt(rating, 10),
      hostType: OfferTypeEnum[hostType as OfferTypeEnum],
      bedrooms: parseInt(rooms, 10),
      quests: parseInt(quests, 10),
      price: parseInt(price, 10),
      features: this.parseFeatures(features),
      author: { name: userName, avatar:  avatarUrl, isPro: this.parseBoolean(isPro), email, password },
      comments: parseInt(comments, 10),
      location: this.parseLocation(location)
    };
  }

  private parseBoolean(value: string): boolean {
    return value.toLowerCase() === 'true';
  }

  // private parseUser(author: string, email: string, avatar:string): UserType {
  //   const [name, email, avatar, password, userType] = author.split(';');
  //   return {name, email, avatar, password, userType: userType === 'normal' ? 'normal' : 'pro'};
  // }

  private parseLocation(location: string): LocationType {
    const [latitude, longitude] = location.split(',').map((coord) => Number(coord));
    return {latitude, longitude};
  }

  private parseFeatures(features: string): FeaturesTypeEnum[] {
    return features.split(',').map((name) => {
      const featuresEnumValue = FeaturesTypeEnum[name.trim() as FeaturesTypeEnum];
      if (featuresEnumValue) {
        return featuresEnumValue;
      } else {
        throw new Error(`Invalid features: ${name}`);
      }
    });
  }

  public read(): void {
    this.rawData = readFileSync(this.fileName, {encoding: 'utf-8'});
  }

  public toArray(): OfferType[] {
    this.validateRowData();
    return this.parseRawDataToOffers();
  }
}


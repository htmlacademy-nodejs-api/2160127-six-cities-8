import {IFileReader} from './file-reader.interface.js';
import {OfferType, UserType, LocationType} from '../../types/entities.types.js';
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
      publDate,
      city,
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
      author,
      comments,
      location
    ] = row.split('\t');

    return {
      title,
      description,
      date: new Date(publDate),
      city,
      previewImage,
      images: images.split(';'),
      isPremium: isPremium === 'true',
      isFavorite: isFavorite === 'true',
      rating: parseInt(rating, 10),
      hostType,
      bedrooms: parseInt(rooms, 10),
      quests: parseInt(quests, 10),
      price: parseInt(price, 10),
      features: features.split(';'),
      author: this.parseUser(author),
      comments: parseInt(comments, 10),
      location: this.parseLocation(location)
    };
  }

  private parseUser(author: string): UserType {
    const [name, email, avatar, password, userType] = author.split(';');
    return {name, email, avatar, password, userType: userType === 'normal' ? 'normal' : 'pro'};
  }

  private parseLocation(location: string): LocationType {
    const [latitude, longitude] = location.split(',').map((coord) => Number(coord));
    return {latitude, longitude};
  }

  public read(): void {
    this.rawData = readFileSync(this.fileName, {encoding: 'utf-8'});
  }

  public toArray(): OfferType[] {
    this.validateRowData();
    return this.parseRawDataToOffers();
  }
}

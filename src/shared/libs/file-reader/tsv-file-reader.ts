// import {IFileReader} from './file-reader.interface.js';
import { createReadStream } from 'node:fs';
import {OfferType, LocationType, OfferTypeEnum, FeaturesTypeEnum} from '#shared/types/entities.types.js';
//import {readFileSync} from 'node:fs';
import EventEmitter from 'node:events';
// import chalk from 'chalk';

export class TVSFileReader extends EventEmitter {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(
    private readonly filename: string
  ) {
    super();
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }
    this.emit('end', importedRowCount);
  }
}


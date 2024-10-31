// import {IFileReader} from './file-reader.interface.js';
import { createReadStream } from 'node:fs';
import {OfferType, Location, OfferTypeEnum, Goods, CityName} from '../../types/index.js';
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
      // isFavorite,
      // rating,
      hostType,
      rooms,
      maxAdults,
      price,
      goods,
      userName,
      avatarUrl,
      password,
      type,
      email,
      location,
      comments
    ] = row.split('\t');

    return {
      title,
      description,
      date: new Date(postDate),
      city: { name: CityName[city as CityName], location: this.parseLocation(cityLocation)},
      previewImage,
      images: images.split(';'),
      isPremium: this.parseBoolean(isPremium),
      // isFavorite: isFavorite === 'true',
      // rating: parseInt(rating, 10),
      hostType: OfferTypeEnum[hostType as OfferTypeEnum],
      bedrooms: parseInt(rooms, 10),
      maxAdults: parseInt(maxAdults, 10),
      price: parseInt(price, 10),
      goods: this.parseGoods(goods),
      author: { name: userName, avatar:  avatarUrl, type: type, email, password },
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

  private parseLocation(location: string): Location {
    const [latitude, longitude] = location.split(',').map((coord) => Number(coord));
    return {latitude, longitude};
  }

  private parseGoods(goods: string): Goods[] {
    return goods.split(',').map((name) => {
      const goodsEnumValue = Goods[name.trim() as Goods];
      if (goodsEnumValue) {
        return goodsEnumValue;
      } else {
        throw new Error(`Invalid goods: ${name}`);
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
        await new Promise((resolve) => {
          this.emit('line', parsedOffer, resolve);
        });
      }
    }
    this.emit('end', importedRowCount);
  }
}


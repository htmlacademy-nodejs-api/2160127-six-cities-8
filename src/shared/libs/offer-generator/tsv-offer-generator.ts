import {IOfferGenerator} from './offer-generator.interface.js';
import {MockServerDataType} from '../../types/mock-server-data.type.js';
import {OfferTypeEnum} from '../../types/entities.types.js';
import {getRandomDate, getRandomItem, getRandomItems, getRandomBoolean, getRandomInRange} from '../../helpers/common.js';
import {PriceLimit, RatingLimit, RoomLimit, AdultLimit} from './const.js';

export class TSVOfferGenerator implements IOfferGenerator {
  constructor(private readonly mockData: MockServerDataType) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = getRandomDate().toISOString();
    const previewImage = getRandomItem<string>(this.mockData.previews);
    const images = getRandomItems<string>(this.mockData.images);
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const rating = getRandomInRange(RatingLimit, 1).toString();
    const type = getRandomItem(Object.keys(OfferTypeEnum));
    const price = getRandomInRange(PriceLimit);
    const bedrooms = getRandomInRange(RoomLimit);
    const adults = getRandomInRange(AdultLimit);
    const goods = getRandomItems<string>(this.mockData.features).join(',');
    const userName = getRandomItem(this.mockData.users);
    const avatarUrl = getRandomItem<string>(this.mockData.avatars);
    const isPro = getRandomBoolean();
    const email = getRandomItem<string>(this.mockData.emails);
    const city = getRandomItem<string>(this.mockData.cities);
    const cityLocation = getRandomItem<string>(this.mockData.coordinates);
    const location = getRandomItem<string>(this.mockData.coordinates);

    return [
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
      type,
      bedrooms,
      adults,
      price,
      goods,
      userName,
      avatarUrl,
      isPro,
      email,
      location
    ].join('\t');
  }
}

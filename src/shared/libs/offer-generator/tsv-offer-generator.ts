import {IOfferGenerator} from './offer-generator.interface.js';
import {MockServerDataType} from '../../types/mock-server-data.type.js';
import {OfferTypeEnum} from '../../types/index.js';
import {getRandomDate, getRandomItem, getRandomItems, getRandomBoolean, getRandomInRange} from '../../helpers/common.js';
import {PriceLimit, RatingLimit, RoomLimit, QuestsLimit, CommentsLimit} from './const.js';

export class TSVOfferGenerator implements IOfferGenerator {
  constructor(private readonly mockData: MockServerDataType) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = getRandomDate().toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const cityLocation = getRandomItem<string>(this.mockData.coordinates);
    const previewImage = getRandomItem<string>(this.mockData.previews);
    const images = getRandomItems<string>(this.mockData.images);
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const rating = getRandomInRange(RatingLimit, 1).toString();
    const offerTypes = getRandomItem(Object.keys(OfferTypeEnum));
    const rooms = getRandomInRange(RoomLimit);
    const quests = getRandomInRange(QuestsLimit);
    const price = getRandomInRange(PriceLimit);
    const features = getRandomItems<string>(this.mockData.features).join(',');
    const userName = getRandomItem(this.mockData.users);
    const avatarUrl = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);
    const isPro = getRandomBoolean();
    const email = getRandomItem<string>(this.mockData.emails);
    const location = getRandomItem<string>(this.mockData.coordinates);
    const comments = getRandomInRange(CommentsLimit);

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
      offerTypes,
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
    ].join('\t');
  }
}

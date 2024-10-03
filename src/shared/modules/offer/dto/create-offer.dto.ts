import { CityName, OfferTypeEnum } from '../../../types/index.js';
import { Features } from '../../../types/index.js';
import { Location } from '../../../types/index.js';


export class CreateOfferDto {
  public title: string;
  public description: string;
  public createdDate: Date;
  public city: CityName;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public OfferTypeEnum: OfferTypeEnum;
  public bedrooms: number;
  public quests: number;
  public price: number;
  public features: Features[];
  public userId: string;
  public location: Location;
}

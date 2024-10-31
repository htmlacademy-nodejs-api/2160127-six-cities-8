import { CityName } from '../city-name.enum';
import { OfferTypeEnum } from '../offer-type.enum';
import { Goods } from '../feature.type';
import { Location } from '../location.type';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public createdDate?: Date;
  public city?: CityName;
  public location?: Location;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public rating?: number;
  public OfferTypeEnum?: OfferTypeEnum;
  public bedrooms?: number;
  public maxAdults?: number;
  public price?: number;
  public goods?: Goods[];
  public userId?: string;
}

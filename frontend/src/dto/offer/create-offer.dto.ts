import { CityName } from '../city-name.enum';
import { OfferTypeEnum } from '../offer-type.enum';
import { Features } from '../feature.type';
import { Location } from '../location.type';

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public createdDate!: Date;
  public city!: CityName;
  public location!: Location;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public OfferTypeEnum!: OfferTypeEnum;
  public bedrooms!: number;
  public quests!: number;
  public price!: number;
  public features!: Features[];
  public userId!: string;
}

import { Expose, Type } from 'class-transformer';
import { CityName, OfferTypeEnum } from '../../../types/index.js';
import { Goods } from '../../../types/index.js';
import { Location } from '../../../types/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public createdDate: Date;

  @Expose()
  public city: CityName;

  @Expose()
  public location: Location;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  // @Expose()
  // public rating: number;

  @Expose()
  public type: OfferTypeEnum;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: Goods[];

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public host: UserRdo;
}

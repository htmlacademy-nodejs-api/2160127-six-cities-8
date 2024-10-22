import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { OfferRdo } from '../../offer/index.js';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public comment: string;

  @Expose()
  public rating: string;

  @Expose({ name: 'offerId' })
  @Type(() => OfferRdo)
  public offer: OfferRdo;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user: UserRdo;

}

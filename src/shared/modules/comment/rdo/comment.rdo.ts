import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public comment: string;

  @Expose()
  public rating: string;

  @Expose()
  public offerId: string;

  @Expose()
  public userId: string;

}

import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { UserEntity } from './../user/user.entity.js';
import { IOfferEntity } from './../offer/offer.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}


@modelOptions({
  schemaOptions: {
    collection: 'Comments',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({required: true, trim: true, minlength: 5, maxlength: 1024 })
  public comment: string;

  @prop({required: true, trim: true, default: new Date() })
  public date: Date;

  @prop({required: true, trim: true, max: 5, min: 1})
  public rating: number;

  @prop({ ref: IOfferEntity, required: true })
  public offerId: Ref<IOfferEntity>;

  @prop({ ref: UserEntity, required: true })
  public userId: Ref<UserEntity>;

}

export const CommentModel = getModelForClass(CommentEntity);

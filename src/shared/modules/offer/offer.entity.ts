import { UserEntity } from '../../modules/user/index.js';
import { City } from '../../types/index.js';
import { Features } from '../../types/index.js';
import { Location } from '../../types/index.js';
import { OfferTypeEnum } from '../../types/index.js';
import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface IOfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class IOfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true, minlength: 10, maxlength: 100 })
  public title: string;

  @prop({ trim: true, required: true, minlength: 20, maxlength: 1024 })
  public description: string;

  @prop({ required: true, default: new Date() })
  public createdDate: Date;

  @prop({ required: true })
  public city: City;

  @prop({ required: true })
  public previewImage: string;

  @prop({ required: true })
  public images: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorite: boolean;

  @prop({ required: true, max: 5, min: 1 })
  public rating: number;

  @prop({ required: true, type: () => String, enum: OfferTypeEnum })
  public OfferTypeEnum: OfferTypeEnum;

  @prop({ required: true, max: 8, min: 1 })
  public bedrooms: number;

  @prop({ required: false, max: 10, min: 1 })
  public quests: number;

  @prop({ required: true, max: 100000, min: 100 })
  public price: number;

  @prop({ required: true })
  public features: Features[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;

  @prop({ required: true })
  public location: Location;
}

export const OfferModel = getModelForClass(IOfferEntity);

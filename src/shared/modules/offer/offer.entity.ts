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
  @prop({ trim: true, required: true })
  public title: string;

  @prop({ trim: true, required: true })
  public description: string;

  @prop({ required: true })
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

  @prop({ required: true })
  public rating: number;

  @prop({ required: true, type: () => String, enum: OfferTypeEnum })
  public OfferTypeEnum: OfferTypeEnum;

  @prop({ required: true })
  public bedrooms: number;

  @prop({ required: false })
  public quests: number;

  @prop({ required: true })
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

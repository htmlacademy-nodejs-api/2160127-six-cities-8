import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { IOfferEntity } from '../offer/index.js';
import { UserEntity } from '../user/index.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface FavoriteEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'favorites',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class FavoriteEntity extends defaultClasses.TimeStamps {
  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({
    ref: IOfferEntity,
    required: true
  })
  public offerId!: Ref<IOfferEntity>;
}

export const FavoriteModel = getModelForClass(FavoriteEntity);

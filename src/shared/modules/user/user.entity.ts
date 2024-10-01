import { getModelForClass, prop } from '@typegoose/typegoose';

import { UserType } from '../../types/entities.types.js';

export class UserEntity implements UserType {
  @prop({ required: true })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatar: string;

  @prop({ required: true })
  public password: string;

  @prop({ required: false })
  public isPro: boolean;
}

export const UserModel = getModelForClass(UserEntity);

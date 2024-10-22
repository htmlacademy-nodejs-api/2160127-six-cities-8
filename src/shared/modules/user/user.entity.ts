import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';

import { User } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, default: '', maxlength: 15, minlength: 1 })
  public name: string;

  @prop({ unique: true, required: true, validate: {
    validator: function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }, message: 'Invalid email address format', }, })
  public email: string;

  @prop({ required: false, validate: {
    validator: function (value) {
      return /^.*(.png|.jpg)$/.test(value);
    }, message: 'Invalid avatar pictire format', }, })
  public avatar: string;

  @prop({ required: true, maxlength: 12, minlength: 6 })
  public password?: string;


  @prop({ required: false })
  public isPro: boolean;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.isPro = userData.isPro;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);

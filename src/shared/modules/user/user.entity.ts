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
  @prop({ required: true })
  public name: string;

  // Валидацию перенес на DTO, зде было так:
  // @prop({ unique: true, required: true, validate: {
  //   validator: function (value) {
  //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  //   }, message: 'Invalid email address format', }, })
  @prop({ unique: true, required: true })
  public email: string;

  // Валидацию перенес на DTO, зде было так:
  // @prop({ required: false, validate: {
  //   validator: function (value) {
  //     return /^.*(.png|.jpg)$/.test(value);
  //   }, message: 'Invalid avatar pictire format', }, })
  @prop({ required: false })
  public avatar: string;

  @prop({ required: true })
  public password?: string;


  @prop({ required: false })
  public type: string;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);

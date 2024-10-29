import { MaxLength, MinLength, IsBoolean, IsEmail } from 'class-validator';

import { CreateUserValidationMessage } from './create-user.messages.js';
export class CreateUserDto {
  @MinLength(1, { message: CreateUserValidationMessage.name.minLength })
  @MaxLength(15, { message: CreateUserValidationMessage.name.maxLength })
  public name: string;

  @IsEmail({},{message:CreateUserValidationMessage.email.invalid})
  public email: string;

  //Оставил кооменатрий ниже, чтобы сохранить для себя регулярку по проверки почты
  // @Matches(/^.*(.png|.jpg)$/,{message: CreateUserValidationMessage.avatar.invalidFormat})
  // public avatar: string;

  @MinLength(6, { message: CreateUserValidationMessage.password.minLength })
  @MaxLength(12, { message: CreateUserValidationMessage.password.maxLength })
  public password: string;

  @IsBoolean({ message: CreateUserValidationMessage.isPro.invalid })
  public isPro: boolean;
}

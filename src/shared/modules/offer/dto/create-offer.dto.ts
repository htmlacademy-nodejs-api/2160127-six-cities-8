import { IsArray, IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength, IsBoolean } from 'class-validator';

import { CityName, OfferTypeEnum } from '../../../types/index.js';
import { Features } from '../../../types/index.js';
import { Location } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';


export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.createdDate.invalidFormat })
  public createdDate: Date;

  @IsEnum(CityName, { message: CreateOfferValidationMessage.city.invalid })
  public city: CityName;

  public location: Location;

  public previewImage: string;

  @IsArray({message: CreateOfferValidationMessage.images.invalidFormat})
  public images: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalid })
  public isPremium: boolean;

  @IsBoolean({ message: CreateOfferValidationMessage.isFavorite.invalid })
  public isFavorite: boolean;

  @IsInt({ message: CreateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rating.minValue })
  @Max(5, { message: CreateOfferValidationMessage.rating.maxValue })
  public rating: number;

  @IsEnum(OfferTypeEnum, { message: CreateOfferValidationMessage.OfferTypeEnum.invalid })
  public OfferTypeEnum: OfferTypeEnum;

  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms: number;

  @IsInt({ message: CreateOfferValidationMessage.quests.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.quests.minValue })
  @Max(10, { message: CreateOfferValidationMessage.quests.maxValue })
  public quests: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({message: CreateOfferValidationMessage.features.invalidFormat})
  public features: Features[];

  public userId: string;
}

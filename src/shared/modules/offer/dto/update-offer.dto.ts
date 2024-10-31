import { IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsBoolean,
  IsOptional } from 'class-validator';

import { CityName, OfferTypeEnum } from '../../../types/index.js';
import { Goods } from '../../../types/index.js';
import { Location } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: CreateOfferValidationMessage.createdDate.invalidFormat })
  public createdDate?: Date;

  @IsOptional()
  @IsEnum(CityName, { message: CreateOfferValidationMessage.city.invalidFormat })
  public city?: CityName;

  @IsOptional()
  public location?: Location;

  @IsOptional()
  public previewImage: string;

  @IsOptional()
  @IsArray({message: CreateOfferValidationMessage.images.invalidFormat})
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalid })
  public isPremium?: boolean;

  // @IsOptional()
  // @IsBoolean({ message: CreateOfferValidationMessage.isFavorite.invalid })
  // public isFavorite?: boolean;

  // @IsOptional()
  // @IsInt({ message: CreateOfferValidationMessage.rating.invalidFormat })
  // @Min(1, { message: CreateOfferValidationMessage.rating.minValue })
  // @Max(5, { message: CreateOfferValidationMessage.rating.maxValue })
  // public rating?: number;

  @IsOptional()
  @IsEnum(OfferTypeEnum, { message: CreateOfferValidationMessage.OfferTypeEnum.invalid })
  public OfferTypeEnum?: OfferTypeEnum;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({message: CreateOfferValidationMessage.goods.invalidFormat})
  public goods?: Goods[];

  @IsOptional()
  @IsMongoId({ message: CreateOfferValidationMessage.userId.invalidId })
  public userId?: string;
}

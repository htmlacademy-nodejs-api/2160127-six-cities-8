import { IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';

import { CreateCommentValidationMessage } from './create-comment.messages.js';
export class CreateCommentDto {
  @MinLength(5, { message: CreateCommentValidationMessage.comment.minLength })
  @MaxLength(1024, { message: CreateCommentValidationMessage.comment.maxLength })
  public comment: string;

  @IsInt({ message: CreateCommentValidationMessage.rating.invalidFormat })
  @Min(1, { message: CreateCommentValidationMessage.rating.minValue })
  @Max(5, { message: CreateCommentValidationMessage.rating.maxValue })
  public rating: number;

  @IsMongoId({ message: CreateCommentValidationMessage.offerId.invalidId })
  public offerId: string;

  @IsMongoId({ message: CreateCommentValidationMessage.userId.invalidId })
  public userId: string;
}

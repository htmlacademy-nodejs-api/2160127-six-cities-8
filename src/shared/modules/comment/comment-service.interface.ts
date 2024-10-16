import { DocumentType } from '@typegoose/typegoose';
import { CreateCommentDto } from './dto/create-comment-dto.js';
import { CommentEntity } from './comment-entity.js';

export type CommentEntityDocument = DocumentType<CommentEntity>;

export interface ICommentService {
  create(dto: CreateCommentDto): Promise<CommentEntityDocument>;
  find(): Promise<DocumentType<CommentEntity>[]>;
  findByOfferId(offerId: string): Promise<CommentEntityDocument | null>;
  deleteByOfferId(offerId: string): Promise<number | null>;
}

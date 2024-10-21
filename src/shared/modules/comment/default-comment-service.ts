import { ILogger } from '../../libs/logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';
import { types, DocumentType } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { CreateCommentDto } from './dto/create-comment-dto.js';
import { CommentEntity } from './comment-entity.js';
import {
  CommentEntityDocument,
  ICommentService,
} from './comment-service.interface.js';
//import { IOfferEntity } from '../offer/index.js';
import { DEFAULT_COMMENT_COUNT } from './index.js';

@injectable()
export class DefaultCommentService implements ICommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.CommentModel)
    private readonly CommentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<CommentEntityDocument> {
    const result = await this.CommentModel.create(dto);
    this.logger.info('New Comment created');
    return result;
  }

  public async findByOfferId(offerId: string): Promise<CommentEntityDocument | null> {
    return this.CommentModel.findById(offerId).populate(['userId']).exec();
  }

  public async find(count: number = DEFAULT_COMMENT_COUNT, offset: number = 0): Promise<DocumentType<CommentEntity>[]> {
    return this.CommentModel
      .find({}, {}, { limit: count, skip: offset })
      .populate(['userId', 'offerId'])
      .exec();
  }

  public async findById(id: string): Promise<CommentEntity | null> {
    return this.CommentModel
      .findById(id)
      .populate(['userId', 'offerId'])
      .exec();
  }

  public async findCountByOfferId(offerId: string): Promise<number> {
    return this.CommentModel
      .countDocuments({offerId:offerId})
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.CommentModel.deleteMany({offerId}).exec();
    this.logger.info(`Comment by offerId= ${offerId} deleted`);
    return result.deletedCount;
  }
}

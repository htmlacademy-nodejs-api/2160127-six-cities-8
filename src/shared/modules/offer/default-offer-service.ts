import { ILogger } from '../../libs/logger/index.js';
import { Component, SortType } from '../../types/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { CreateOfferDto } from './index.js';
import { IOfferEntity } from './index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
import {
  OfferEntityDocument,
  IOfferService,
} from './offer-service.interface.js';
import { UserEntity} from '../user/index.js';
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';


@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<IOfferEntity>,
    @inject(Component.UserModel)
    private readonly userModel: types.ModelType<UserEntity>
  ) {}

  async create(dto: CreateOfferDto): Promise<OfferEntityDocument> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title} ${dto.description} ${dto.createdDate}`);

    return result;
  }

  findById(offerId: string): Promise<OfferEntityDocument | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async find(count: number = DEFAULT_OFFER_COUNT, offset: number = 0): Promise<DocumentType<IOfferEntity>[]> {
    return this.offerModel
      .find({}, {}, { limit: count, skip: offset })
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<IOfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<IOfferEntity> | null> {
    if (dto.userId) {
      const foundUser = await this.userModel.findById({ _id: { $in: dto.userId }});
      if (!foundUser) {
        throw new HttpError(StatusCodes.BAD_REQUEST, 'Some categories not exists', 'DefaultOfferService');
      }

    }

    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<IOfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async findNew(count: number): Promise<DocumentType<IOfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(count)
      .populate(['userId'])
      .exec();
  }

  public async findDiscussed(count: number): Promise<DocumentType<IOfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ commentCount: SortType.Down })
      .limit(count)
      .populate(['userId'])
      .exec();
  }
}

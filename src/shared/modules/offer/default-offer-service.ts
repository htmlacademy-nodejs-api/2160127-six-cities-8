import { ILogger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { CreateOfferDto } from './index.js';
import { IOfferEntity } from './index.js';
import {
  OfferEntityDocument,
  IOfferService,
} from './offer-service.interface.js';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<IOfferEntity>
  ) {}

  async create(dto: CreateOfferDto): Promise<OfferEntityDocument> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title} ${dto.description} ${dto.createdDate}`);

    return result;
  }

  findById(offerId: string): Promise<OfferEntityDocument | null> {
    return this.offerModel.findById(offerId).exec();
  }
}

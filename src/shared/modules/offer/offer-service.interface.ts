import {DocumentType} from '@typegoose/typegoose';

import { CreateOfferDto } from './dto/create-offer.dto.js';
import { IOfferEntity } from './offer.entity.js';

export type OfferEntityDocument = DocumentType<IOfferEntity>;

export interface IOfferService {
  create(dto: CreateOfferDto): Promise<OfferEntityDocument>;
  findById(offerId: string): Promise<OfferEntityDocument | null>;
}

import {DocumentType} from '@typegoose/typegoose';

import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { IOfferEntity } from './offer.entity.js';

export type OfferEntityDocument = DocumentType<IOfferEntity>;

export interface IOfferService {
  create(dto: CreateOfferDto): Promise<OfferEntityDocument>;
  findById(offerId: string): Promise<OfferEntityDocument | null>;
  find(): Promise<DocumentType<IOfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<IOfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<IOfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<IOfferEntity> | null>;
  findNew(count: number): Promise<DocumentType<IOfferEntity>[]>;
  findDiscussed(count: number): Promise<DocumentType<IOfferEntity>[]>;
  exists(documentId: string): Promise<boolean>;
}

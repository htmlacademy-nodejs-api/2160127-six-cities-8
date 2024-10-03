import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { IOfferService } from './offer-service.interface.js';
import { Component } from '../../types/index.js';
import { DefaultOfferService } from './default-offer-service.js';
import { IOfferEntity, OfferModel } from './offer.entity.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<IOfferService>(Component.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<IOfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
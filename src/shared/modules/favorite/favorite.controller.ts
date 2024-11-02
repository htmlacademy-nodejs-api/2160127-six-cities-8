import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, DocumentExistsMiddleware, HttpMethod, PrivateRouteMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { fillDTO } from '../../helpers/index.js';
import { Component } from '../../types/index.js';
import { FavoriteService } from './favorite-service.interface.js';
import { CreateOfferDto, OfferRdo, IOfferService, ParamOfferId } from '../offer/index.js';


@injectable()
export class FavoritesController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.FavoriteService) private readonly favoriteService: FavoriteService,
    @inject(Component.OfferService) private readonly offerService: IOfferService
  ) {
    super(logger);
    this.logger.info('Register routes for FavoritesController...');

    const privateRouteMiddleware = new PrivateRouteMiddleware();
    const validateObjectIdMiddleware = new ValidateObjectIdMiddleware('offerId');
    const offerExistsMiddleware = new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId');
    const middlewares = [privateRouteMiddleware, validateObjectIdMiddleware, offerExistsMiddleware];

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [privateRouteMiddleware]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.add,
      middlewares
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares
    });
  }

  public async index({ tokenPayload }: Request, res: Response): Promise<void> {
    this.logger.debug('hereeee');
    const favoriteOffers = await this.favoriteService.findOffersByUserId(tokenPayload.id);
    const offers: OfferRdo[] = [];

    favoriteOffers.forEach((favorite) => {
      if (favorite.offerId) {
        const offer = fillDTO(OfferRdo, favorite.offerId);
        offers.push({ ...offer, isFavorite: true });
      }
    });

    this.ok(res, offers);
  }

  public async add({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const favorite = await this.favoriteService.find(offerId, tokenPayload.id);
    const offer = await this.offerService.findById(offerId);

    if (!favorite) {
      await this.favoriteService.add(offerId, tokenPayload.id);
    }

    const offerRdo = fillDTO(CreateOfferDto, offer);

    this.ok(res, { ...offerRdo, isFavorite: true });
  }

  public async delete({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const favorite = await this.favoriteService.find(offerId, tokenPayload.id);
    const offer = await this.offerService.findById(offerId);

    if (favorite) {
      await this.favoriteService.deleteById(favorite.id);
    }

    const offerRdo = fillDTO(CreateOfferDto, offer);

    this.ok(res, { ...offerRdo, isFavorite: false });
  }
}

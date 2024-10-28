import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  BaseController,
  HttpError,
  HttpMethod,
  ValidateObjectIdMiddleware,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware,
  DocumentExistsMiddleware } from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { IOfferService } from './offer-service.interface.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './index.js';
import { CreateOfferRequest } from './type/create-offer-request.type.js';
import { UpdateOfferDto } from './index.js';
import { ICommentService } from '../comment/comment-service.interface.js';
// import { CommentRdo } from '../comment/rdo/comment.rdo.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';


@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
    @inject(Component.CommentService) private readonly commentService: ICommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)]
    });
    this.addRoute({ path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')] });
    this.addRoute({ path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')] });
    this.addRoute({ path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')] });
    this.addRoute({ path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ] });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    //this.ok(res, offers);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res,fillDTO(OfferRdo, offer));
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
    this.logger.info(`Create offer ${result.id}`);
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    if (!await this.offerService.exists(params.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    // Если раскомментировать строчку ниже, то получаю ошибку: Cannot access 'OfferRdo' before initialization
    // this.ok(res, fillDTO(CommentRdo, comments));
    // TODO спросить у наставника
    this.ok(res, comments);
  }

}

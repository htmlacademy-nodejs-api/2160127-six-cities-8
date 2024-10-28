import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import {
  BaseController,
  HttpError,
  HttpMethod,
  ValidateObjectIdMiddleware,
  ValidateDtoMiddleware,
  PrivateRouteMiddleware, } from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { ICommentService } from './comment-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { CommentRdo, CreateCommentDto } from './index.js';
import { CreateUserRequest } from './create-comment-request.type.js';
import { ParamOfferId } from '../offer/type/param-offerid.type.js';
import { IOfferService } from '../offer/offer-service.interface.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.CommentService) private readonly commentService: ICommentService,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),] });
    this.addRoute({ path: '/count/:offerId',
      method: HttpMethod.Get,
      handler: this.countByOfferId,
      middlewares: [new ValidateObjectIdMiddleware('offerId')] });
    this.addRoute({ path: '/list/:offerId', method: HttpMethod.Get, handler: this.findByOfferId });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const comments = await this.commentService.find();
    const responseData = fillDTO(CommentRdo, comments);
    this.ok(res, responseData);
  }

  public async findByOfferId({ params }: Request<ParamOfferId, unknown, CommentRdo>, res: Response): Promise<void> {
    const commentsList = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo,commentsList));

  }

  public async countByOfferId({ params }: Request<ParamOfferId, unknown, CommentRdo>, res: Response): Promise<void> {
    const commentsCount = await this.commentService.findCountByOfferId(params.offerId);
    this.ok(res, commentsCount);

  }

  public async create(
    { body, tokenPayload }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const offer = await this.offerService.findById(body.offerId);
    if(!offer){
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }
    const comment = await this.commentService.create({ ...body, userId: tokenPayload.id });
    console.log('result', comment);
    // const comment = await this.commentService.findById(result.id);
    await this.offerService.incCommentCount(body.offerId);
    this.logger.info(`Create offer ${comment.id}`);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}

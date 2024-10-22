import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';


import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { ICommentService } from './comment-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { CommentRdo, CreateCommentDto } from './index.js';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
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
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/count/:offerId', method: HttpMethod.Get, handler: this.countByOfferId });
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

  public async create({ body }: Request<RequestParams, RequestBody, CreateCommentDto >, res: Response): Promise<void> {
    const offer = await this.offerService.findById(body.offerId);
    if(!offer){
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }
    const result = await this.commentService.create(body);
    const comment = await this.commentService.findById(result.id);
    this.created(res, fillDTO(CreateCommentDto, comment));
    this.logger.info(`Create offer ${result.id}`);
  }
}

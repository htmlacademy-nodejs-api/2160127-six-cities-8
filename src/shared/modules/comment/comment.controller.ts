import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { ICommentService } from './comment-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { CommentRdo } from './index.js';


@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.CommentService) private readonly commentService: ICommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const comments = await this.commentService.find();
    const responseData = fillDTO(CommentRdo, comments);
    this.ok(res, responseData);
  }

  public create(_req: Request, _res: Response): void {
    // Код обработчика
  }
}

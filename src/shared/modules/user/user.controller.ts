import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { IUserService } from './user-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { UserRdo } from './index.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.UserService) private readonly userService: IUserService,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const users = await this.userService.find();
    //this.ok(res, users);
    const responseData = fillDTO(UserRdo, users);
    this.ok(res, responseData);
  }

  public create(_req: Request, _res: Response): void {
    // Код обработчика
  }
}

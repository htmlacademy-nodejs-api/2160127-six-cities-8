import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { IUserService } from './user-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { UserRdo, CreateUserDto } from './index.js';
// import { CreateUserRequest } from './create-user-request.type.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.UserService) private readonly userService: IUserService,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const users = await this.userService.find();
    //this.ok(res, users);
    const responseData = fillDTO(UserRdo, users);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response, next: NextFunction
  ): Promise<void> {
    try {
      const existUser = await this.userService.findByEmail(body.email);

      if (existUser) {
        const existUserError = new Error(`User with email «${body.email}» exists.`);
        this.send(res,
          StatusCodes.UNPROCESSABLE_ENTITY,
          { error: existUserError.message }
        );
        return this.logger.error(existUserError.message, existUserError);
      }
      const result = await this.userService.create(body, 'secret');
      this.created(res, fillDTO(UserRdo, result));
    } catch (error) {
      return next(error);
    }
  }
}

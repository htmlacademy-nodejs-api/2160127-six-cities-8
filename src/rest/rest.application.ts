import { inject, injectable } from 'inversify';

import { ILogger } from '../shared/libs/logger/index.js';
import { IConfig, RestSchema } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/component.enum.js';
import { IDatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { UserModel } from '../shared/modules/user/user-model.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: IDatabaseClient,
  ) {}

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Get value from env $DB_HOST: ${this.config.get('DB_HOST')}`);


    this.logger.info('Init database...');
    await this.initDb();
    this.logger.info('Init database completed');

    const user = await UserModel.create({
      name: 'Keks',
      email: 'test@email.local',
      avatarUrl: 'keks.jpg',
      password: 'Unknown',
      isPro: true
    });
    const error = user.validateSync();
    console.log(error);
  }
}

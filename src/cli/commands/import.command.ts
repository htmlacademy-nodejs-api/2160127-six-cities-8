import {ICommand} from './command.interface.js';
import {TVSFileReader} from '../../shared/libs/file-reader/index.js';
import chalk from 'chalk';
import { OfferType } from '../../shared/types/index.js';
import { getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { DefaultUserService, UserModel, IUserService } from '../../shared/modules/user/index.js';

import { DefaultOfferService, OfferModel, IOfferService } from '../../shared/modules/offer/index.js';
import { IDatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { ILogger } from '../../shared/libs/logger/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';

export class ImportCommand implements ICommand {
  private userService: IUserService;
  private offerService: IOfferService;
  private databaseClient: IDatabaseClient;
  private logger: ILogger;
  private salt: string;

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedOffer(offer: OfferType, resolve: () => void) {
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: OfferType) {

    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    // for (const { name } of offer.categories) {
    //   const existCategory = await this.categoryService.findByCategoryNameOrCreate(name, { name });
    //   categories.push(existCategory.id);
    // }

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      createdDate: offer.date,
      city: offer.city.name,
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      OfferTypeEnum: offer.hostType,
      bedrooms: offer.bedrooms,
      quests: offer.quests,
      price: offer.price,
      features: offer.features,
      userId: user.id,
      location: offer.location,
    });

  }

  private onCompleteImport(count: number) {
    console.info(chalk.green(`${count} rows imported.`));
    this.databaseClient.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.logger.info(`uri = ${uri}`);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TVSFileReader(filename.trim());
    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(chalk.redBright(`Can't import data from file: ${filename}`));
      console.error(chalk.redBright(getErrorMessage(error)));
    }
  }
}

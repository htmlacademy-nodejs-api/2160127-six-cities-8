import got from 'got';
import chalk from 'chalk';

import {ICommand} from './command.interface.js';
import {MockServerDataType} from '../../shared/types/mock-server-data.type.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import { getErrorMessage } from '../../shared/helpers/common.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';

export class GenerateCommand implements ICommand {
  private initialData: MockServerDataType;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);
    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    // Код для получения данных с сервера.
    // Формирование объявлений.
    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(chalk.blueBright.bold(`File ${filepath} was created!`));
    } catch (error: unknown) {
      console.error(chalk.bgRed.bold('Can\'t generate data'));

      console.error(chalk.bgRed.bold(getErrorMessage(error)));
    }
  }
}

import {ICommand} from './command.interface.js';
import {TVSFileReader} from '../../shared/libs/file-reader/index.js';
import chalk from 'chalk';
import { OfferType } from '../../shared/types/index.js';
import { getErrorMessage } from '../../shared/helpers/common.js';

export class ImportCommand implements ICommand {
  private onImportedOffer(offer: OfferType): void {
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(chalk.green(`${count} rows imported.`));
  }

  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TVSFileReader(filename.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(chalk.bgRed.bold(`Can't import data from file: ${filename}`));
      console.error(chalk.bgRed.bold(getErrorMessage(error)));
    }
  }
}

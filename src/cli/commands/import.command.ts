import {ICommand} from './command.interface.js';
import {TVSFileReader} from '../../shared/libs/file-reader/index.js';
import chalk from 'chalk';

export class ImportCommand implements ICommand {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]): void {
    // Чтение файла
    const [filename] = parameters;
    const fileReader = new TVSFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(chalk.bgRed.bold(`Can't import data from file: ${filename}`));
      console.error(chalk.bgRed.bold(`Details: ${err.message}`));
    }
  }
}

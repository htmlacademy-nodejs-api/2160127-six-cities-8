import {ICommand} from './command.interface.js';

export class GenerateCommand implements ICommand {
  public getName(): string {
    return '--generate';
  }

  public execute(...parameters: string[]): void {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    // Код для получения данных с сервера.
    // Формирование объявлений.
  }
}

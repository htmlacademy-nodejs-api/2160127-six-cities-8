import {ICommand} from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements ICommand {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(
      chalk.green(
        `
        Программа для подготовки данных для REST API сервера.
        ${chalk.blue.bold('Пример:')}
          ${chalk.blue.underline(' cli.js --<command> [--arguments]')}
        Команды:
            --version:                   ${chalk.yellow('# выводит номер версии')}
            --help:                      ${chalk.yellow('# печатает этот текст')}
            --import <path>:             ${chalk.yellow('# импортирует данные из TSV')}
            --generate <n> <path> <url>  ${chalk.yellow('# генерирует произвольное количество тестовых данных')}
    `
      )
    );
  }
}

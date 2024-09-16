import {Command} from './command.interfae.js';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

type PackageJSONConfig = {
  version: string;
};

const isPackageJSOnConfig = (value: unknown): value is PackageJSONConfig =>
  typeof value === 'object' && !Array.isArray(value) && value !== null && Object.hasOwn(value, 'version');

export class VersionCommand implements Command {
  constructor(private readonly filePath: string = 'package.json') {}

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), {encoding: 'utf-8'});
    const importedContent = JSON.parse(jsonContent);

    if (isPackageJSOnConfig(importedContent)) {
      throw new Error('Failed to parse json content.');
    }

    return importedContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}

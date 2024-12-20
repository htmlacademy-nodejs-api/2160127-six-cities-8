import { Container } from 'inversify';

import { RestApplication } from './rest.application.js';
import { Component } from '../shared/types/component.enum.js';
import { ILogger, PinoLogger } from '../shared/libs/logger/index.js';
import { IConfig, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { IDatabaseClient, MongoDatabaseClient } from '../shared/libs/database-client/index.js';
import { AppExceptionFilter, ExceptionFilter, ValidationExceptionFilter } from '../shared/libs/rest/index.js';
import { HttpErrorExceptionFilter } from '../shared/libs/rest/exception-filter/http-error.exception-filter.js';
import { PathTransformer } from '../shared/libs/rest/transform/path-transformer.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<IConfig<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<IDatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.HttpExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<PathTransformer>(Component.PathTransformer).to(PathTransformer).inSingletonScope();
  return restApplicationContainer;
}

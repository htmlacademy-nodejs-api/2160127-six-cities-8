import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { FavoriteService } from './favorite-service.interface.js';
import { Component } from '../../types/index.js';
import { DefaultFavoriteService } from './default.favorite-service.js';
import { FavoriteEntity, FavoriteModel } from './favorite.entity.js';
import { IController } from '../../libs/rest/index.js';
import { FavoritesController } from './favorite.controller.js';

export function createFavoriteContainer() {
  const favoriteContainer = new Container();

  favoriteContainer.bind<FavoriteService>(Component.FavoriteService).to(DefaultFavoriteService);
  favoriteContainer.bind<types.ModelType<FavoriteEntity>>(Component.FavoriteModel).toConstantValue(FavoriteModel);
  favoriteContainer.bind<IController>(Component.FavoritesController).to(FavoritesController).inSingletonScope();

  return favoriteContainer;
}

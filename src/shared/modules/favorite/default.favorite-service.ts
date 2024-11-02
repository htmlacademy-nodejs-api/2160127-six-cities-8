import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { FavoriteService } from './favorite-service.interface.js';
import { FavoriteEntity } from './favorite.entity.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>
  ) { }

  public async find(offerId: string, userId: string): Promise<DocumentType<FavoriteEntity> | null> {
    return this.favoriteModel.findOne({ offerId, userId });
  }

  public async exists(offerId: string, userId: string): Promise<boolean> {
    if (!userId) {
      return false;
    }

    const favorite = await this.find(offerId, userId);

    return !!favorite;
  }

  public async findByUserId(userId: string): Promise<DocumentType<FavoriteEntity>[]> {
    return this.favoriteModel
      .find({ userId });
  }


  public async findOffersByUserId(userId: string): Promise<DocumentType<FavoriteEntity>[]> {
    return this.favoriteModel
      .find({ userId })
      .populate('offerId');
  }

  public async add(offerId: string, userId: string): Promise<DocumentType<FavoriteEntity> | null> {
    const result = await this.favoriteModel.create({ offerId, userId });

    this.logger.info(`New favorite created: offerId: ${offerId} / userId: ${userId}`);

    return result;
  }

  public async deleteById(id: string): Promise<DocumentType<FavoriteEntity> | null> {
    const result = await this.favoriteModel.findByIdAndDelete(id);

    if (result) {
      this.logger.info(`Favorite deleted: offerId: ${result.offerId} / userId: ${result.userId}`);
    }

    return result;
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.favoriteModel.deleteMany({ offerId });

    return result.deletedCount;
  }
}

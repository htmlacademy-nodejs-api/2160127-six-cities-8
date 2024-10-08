import { Component } from '../../types/component.enum.js';
import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { DefaultCommentService } from './default-comment-service.js';
import { CommentEntity, CommentModel } from './comment-entity.js';
import { ICommentService } from './comment-service.interface.js';

export function createCommentContainer() {
  const CommentContainer = new Container();
  CommentContainer
    .bind<ICommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();
  CommentContainer
    .bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);

  return CommentContainer;
}

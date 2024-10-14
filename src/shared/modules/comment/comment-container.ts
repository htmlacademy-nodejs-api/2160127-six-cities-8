import { Component } from '../../types/component.enum.js';
import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { DefaultCommentService } from './default-comment-service.js';
import { CommentEntity, CommentModel } from './comment-entity.js';
import { ICommentService } from './comment-service.interface.js';
import { IController } from '../../libs/rest/index.js';
import { CommentController } from './comment.controller.js';


export function createCommentContainer() {
  const CommentContainer = new Container();

  CommentContainer.bind<ICommentService>
  (Component.CommentService).to(DefaultCommentService);
  CommentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  CommentContainer.bind<IController>(Component.CommentController).to(CommentController).inSingletonScope();


  return CommentContainer;
}

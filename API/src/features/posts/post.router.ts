import { Router } from 'express';
import { PostController } from './post.controller';

export class PostRouter {
  public router: Router;
  private postController: PostController;

  constructor(postController: PostController) {
    this.postController = postController;
    this.router = Router();

    this.router.get('/posts', this.postController.getPosts);
    this.router.post('/posts', this.postController.createPost);
    this.router.delete('/posts/:id', this.postController.deletePost);
  }
}
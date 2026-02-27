import { Request, Response } from 'express';
import Boom from '@hapi/boom';
import { PostService } from './post.service';

export class PostController {
  private postService: PostService;

  constructor(postService: PostService) {
    this.postService = postService;
  }

  getPosts = (req: Request, res: Response) => {
    const posts = this.postService.getPosts();
    return res.json(posts);
  };

  createPost = (req: Request, res: Response) => {
    const { img_url, title, description } = req.body;

    if (!img_url) {
      throw Boom.badRequest('Image URL is required');
    }

    if (!title) {
      throw Boom.badRequest('Title is required');
    }

    if (!description) {
      throw Boom.badRequest('Description is required');
    }

    const newPost = this.postService.createPost({
      img_url,
      title,
      description,
    });

    return res.status(201).json(newPost);
  };

  deletePost = (req: Request, res: Response) => {
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;

    this.postService.deletePost(id);

    return res.status(200).json({ message: 'Post deleted' });
  };
}
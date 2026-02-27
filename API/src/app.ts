import express, { Router } from 'express';
import { PORT, NODE_ENV } from './config'; 
import { PostRouter } from './features/posts/post.router';
import cors from 'cors';
import { erroreMiddleware } from './middlewares/errorsMiddleware';
import { PostService } from './features/posts/post.service';
import { PostController } from './features/posts/post.controller';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log(req.query);
  return res.send('Home!!');
});

const apiRouter = Router();
app.use('/api', apiRouter);

const userService = new PostService();

const postController = new PostController(userService);

const userRouter = new PostRouter(postController);
apiRouter.use(userRouter.router);

app.use(erroreMiddleware);

if (NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log ("Server is running on http://localhost:" +PORT);
  });
}

export default app;
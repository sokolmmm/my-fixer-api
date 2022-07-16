import Koa from 'koa';
import { config } from 'dotenv';
import bodyParser from 'koa-bodyparser';

import errorCatcher from './utils/middlewares/errorCatcher';
import userRouter from './user/user.router';
import databaseSource from './database/databaseConfig';
import profileRouter from './profile/profile.router';
import stackRouter from './stack/stack.router';

config();

databaseSource
  .initialize()
  .then(() => {
    const app = new Koa();

    app.use(
      bodyParser({
        jsonLimit: '5mb',
      }),
    );

    app.use(errorCatcher);
    app.use(userRouter.routes());
    app.use(profileRouter.routes());
    app.use(stackRouter.routes());

    app.listen(process.env.PORT, () => {
      console.log(`It works on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.info(`Database connection error: ${error}`);
  });

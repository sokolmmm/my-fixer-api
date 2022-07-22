import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import defaultConfig from './config/default';
import errorCatcher from './utils/middleware/errorCatcher';
import userRouter from './user/user.router';
import databaseSource from './database/databaseConfig';
import profileRouter from './profile/profile.router';
import stackRouter from './stack/stack.router';

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

    app.listen(defaultConfig.port, () => {
      console.log(`It works on port ${defaultConfig.port}`);
    });
  })
  .catch((error) => {
    console.info(`Database connection error: ${error}`);
  });

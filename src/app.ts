import Koa from 'koa';
import { config } from 'dotenv';
import errorCatcher from './utils/middlewares/errorCatcher';
import userRouter from './user/user.router';

config();

const app = new Koa();

app.use(errorCatcher);

app.use(userRouter.routes());

app.listen(process.env.PORT, () => {
  console.log(`It works on port ${process.env.PORT}`);
});

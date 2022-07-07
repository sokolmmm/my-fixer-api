import Koa from 'koa';
import { config } from 'dotenv';
import userRouter from './user/user.router';

config();

const app = new Koa();
// app.use(async (ctx) => {
//   ctx.body = 'Hello world';
//   console.log(process.env.PORT);
// });

app.use(userRouter.routes());

app.listen(process.env.PORT, () => {
  console.log(`It works on port ${process.env.PORT}`);
});

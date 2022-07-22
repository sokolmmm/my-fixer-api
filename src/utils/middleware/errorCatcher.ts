import { Context } from 'koa';
import { BaseError } from '../errors';

export default async function errorCatcher(ctx: Context, next: () => Promise<any>) {
  try {
    await next();
  } catch (error: any | BaseError) {
    let message = 'Something went wrong';
    let status = 500;
    if (error instanceof BaseError) {
      message = error.message;
      status = error.status;
    } else {
      console.log(error);
    }
    ctx.status = status;
    ctx.body = {
      error: message,
    };
  }
}

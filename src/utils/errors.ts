/* eslint-disable max-classes-per-file */
export class BaseError extends Error {
  public status: number;

  constructor(message: string, name: string, status: number) {
    super(message);
    this.status = status;
    this.name = name;
  }
}

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(message, 'ValidationError', 400);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 'NotFoundError', 404);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 'UnauthorizedError', 401);
  }
}

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

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 'UnauthorizedError', 401);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(message, 'Forbidden', 403);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 'NotFoundError', 404);
  }
}

export class ConflictError extends BaseError {
  constructor(message: string) {
    super(message, 'ConflictError', 409);
  }
}

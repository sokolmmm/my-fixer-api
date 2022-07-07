"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ValidationError = exports.BaseError = void 0;
/* eslint-disable max-classes-per-file */
class BaseError extends Error {
    status;
    constructor(message, name, status) {
        super(message);
        this.status = status;
        this.name = name;
    }
}
exports.BaseError = BaseError;
class ValidationError extends BaseError {
    constructor(message) {
        super(message, 'ValidationError', 400);
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends BaseError {
    constructor(message) {
        super(message, 'NotFoundError', 404);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=errors.js.map
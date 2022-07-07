"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
async function errorCatcher(ctx, next) {
    try {
        await next();
    }
    catch (error) {
        let message = 'Something went wrong';
        let status = 500;
        if (error instanceof errors_1.BaseError) {
            message = error.message;
            status = error.status;
        }
        else {
            console.log(error);
        }
        ctx.status = status;
        ctx.body = {
            error: message,
        };
    }
}
exports.default = errorCatcher;
//# sourceMappingURL=errorCatcher.js.map
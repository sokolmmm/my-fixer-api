"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const controller_1 = __importDefault(require("./controller"));
const userRouter = new koa_router_1.default();
userRouter.get('/users', controller_1.default.usersList);
exports.default = userRouter;
//# sourceMappingURL=router.js.map
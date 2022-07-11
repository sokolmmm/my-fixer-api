"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const user_controller_1 = __importDefault(require("./user.controller"));
const userRouter = new koa_router_1.default();
userRouter.get('/users', user_controller_1.default.usersList);
userRouter.post('/users', user_controller_1.default.createUser);
userRouter.get('/user:userId', user_controller_1.default.retrieveUserById);
userRouter.patch('/user:userId', user_controller_1.default.patchUserById);
userRouter.delete('/user:userId', user_controller_1.default.deleteUserById);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const dotenv_1 = require("dotenv");
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const errorCatcher_1 = __importDefault(require("./utils/middlewares/errorCatcher"));
const user_router_1 = __importDefault(require("./user/user.router"));
(0, dotenv_1.config)();
const app = new koa_1.default();
app.use((0, koa_bodyparser_1.default)({
    jsonLimit: '5mb',
}));
app.use(errorCatcher_1.default);
app.use(user_router_1.default.routes());
app.listen(process.env.PORT, () => {
    console.log(`It works on port ${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map
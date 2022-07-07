"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
class UserController {
    static async usersList(ctx) {
        const users = await user_service_1.default.usersList();
        ctx.body = users;
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map
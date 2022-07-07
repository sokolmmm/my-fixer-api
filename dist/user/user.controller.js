"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const user_validator_1 = __importDefault(require("./user.validator"));
class UserController {
    static async usersList(ctx) {
        const users = await user_service_1.default.usersList();
        ctx.body = users;
    }
    static async retrieveUserById(ctx) {
        const { userId } = ctx.params;
        const user = await user_service_1.default.userById(userId);
        ctx.body = user;
    }
    static async createUser(ctx) {
        const { firstName, lastName, userName, email, } = ctx.request.body;
        user_validator_1.default.validateCreateUserPayload({
            firstName,
            lastName,
            userName,
            email,
        });
        const user = await user_service_1.default.createUser({
            firstName,
            lastName,
            userName,
            email,
        });
        console.log(user);
        ctx.body = user;
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map
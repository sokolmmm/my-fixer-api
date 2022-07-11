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
        const { firstName, lastName, userName, email, country, phoneNumber, title, company, } = ctx.request.body;
        const payload = {
            firstName,
            lastName,
            userName,
            email,
            country,
            phoneNumber,
            title,
            company,
        };
        user_validator_1.default.validateCreateUserPayload(payload);
        const user = await user_service_1.default.createUser(payload);
        console.log(user);
        ctx.body = user;
    }
    static async patchUserById(ctx) {
        const { userId } = ctx.params;
        const { firstName, lastName, userName, email, country, phoneNumber, title, company, } = ctx.request.body;
        const payload = {
            firstName,
            lastName,
            userName,
            email,
            country,
            phoneNumber,
            title,
            company,
        };
        user_validator_1.default.validatePatchUserPayload(payload);
        const user = await user_service_1.default.patchUser({ id: userId, ...payload });
        console.log(user);
        ctx.body = user;
    }
    static async deleteUserById(ctx) {
        const { userId } = ctx.params;
        const user = await user_service_1.default.deleteById(userId);
        ctx.body = user;
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map
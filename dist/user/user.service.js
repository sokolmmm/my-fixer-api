"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const user_repository_1 = __importDefault(require("./user.repository"));
const errors_1 = require("../utils/errors");
class UserService {
    static async usersList() {
        const users = fs_1.default.readFileSync('db.json').toString();
        return users;
    }
    static async userById(uuid) {
        const usersList = fs_1.default.readFileSync('db.json').toString();
        const users = JSON.parse(usersList);
        const user = users.find((el) => el.id === uuid);
        if (!user)
            throw new errors_1.NotFoundError(`User with id: ${uuid} doesn't exist`);
        return user;
    }
    static async createUser(payload) {
        const user = new user_repository_1.default(payload).createUserInDB();
        return user;
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map
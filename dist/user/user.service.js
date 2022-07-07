"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import User from './user.repository';
const fs_1 = __importDefault(require("fs"));
class UserService {
    static async usersList() {
        const users = fs_1.default.readFileSync('db.json');
        return users;
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map
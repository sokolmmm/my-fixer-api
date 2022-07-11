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
        const user = new user_repository_1.default();
        user.setUserData = payload;
        user.createUserInDB();
        return user;
    }
    static async patchUser(userData) {
        const usersList = fs_1.default.readFileSync('db.json').toString();
        const users = JSON.parse(usersList);
        const userPrevData = users.find((el) => el.id === userData.id);
        if (!userPrevData)
            throw new errors_1.NotFoundError(`User with id: ${userData.id} doesn't exist`);
        const payload = {
            id: userData.id,
            firstName: userData.firstName || userPrevData.firstName,
            lastName: userData.lastName || userPrevData.lastName,
            userName: userData.userName || userPrevData.userName,
            email: userData.email || userPrevData.email,
            country: userData.country || userPrevData.country,
            phoneNumber: userData.phoneNumber || userPrevData.phoneNumber,
            title: userData.title || userPrevData.title,
            company: userData.company || userPrevData.company,
        };
        const user = new user_repository_1.default();
        user.setUserData = payload;
        user.patchUserInDB();
        return user;
    }
    static async deleteById(uuid) {
        const usersList = fs_1.default.readFileSync('db.json').toString();
        const users = JSON.parse(usersList);
        const user = users.find((el) => el.id === uuid);
        if (!user)
            throw new errors_1.NotFoundError(`User with id: ${uuid} doesn't exist`);
        const userIndex = users.findIndex((el) => el.id === uuid);
        users.splice(userIndex, 1);
        fs_1.default.writeFileSync('db.json', JSON.stringify(users));
        return user;
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map
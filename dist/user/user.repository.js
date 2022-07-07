"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
class User {
    id;
    firstName;
    lastName;
    userName;
    email;
    constructor(payload) {
        this.id = (0, uuid_1.v4)();
        this.firstName = payload.firstName;
        this.lastName = payload.lastName;
        this.userName = payload.userName;
        this.email = payload.email;
    }
    mapUser() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            email: this.email,
        };
    }
    entityToString() {
        return JSON.stringify(this.mapUser());
    }
    createUserInDB() {
        const data = fs_1.default.readFileSync('db.json').toString();
        const usersList = JSON.parse(data);
        const userData = this.mapUser();
        usersList.push(userData);
        fs_1.default.writeFileSync('db.json', JSON.stringify(usersList));
        return this.mapUser();
    }
}
exports.default = User;
//# sourceMappingURL=user.repository.js.map
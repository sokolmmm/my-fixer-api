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
    country;
    phoneNumber;
    title;
    company;
    set setUserData(payload) {
        this.id = payload.id || (0, uuid_1.v4)();
        this.firstName = payload.firstName;
        this.lastName = payload.lastName;
        this.userName = payload.userName;
        this.email = payload.email;
        this.country = payload.country || '';
        this.phoneNumber = payload.phoneNumber || '';
        this.title = payload.title || '';
        this.company = payload.company || '';
    }
    mapUser() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            email: this.email,
            country: this.country,
            phoneNumber: this.phoneNumber,
            title: this.title,
            company: this.company,
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
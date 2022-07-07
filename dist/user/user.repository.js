"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    firstName;
    lastName;
    userName;
    email;
    constructor(firstName, lastName, userName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
    }
    mapUser() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            email: this.email,
        };
    }
    entityToString() {
        return JSON.stringify(this.mapUser());
    }
}
exports.default = User;
//# sourceMappingURL=user.repository.js.map
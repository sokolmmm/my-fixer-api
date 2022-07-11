"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const errors_1 = require("../utils/errors");
class UserValidator {
    createUserSchema = joi_1.default.object({
        firstName: joi_1.default.string().min(3).max(15).required(),
        lastName: joi_1.default.string().min(3).max(15).required(),
        userName: joi_1.default.string().min(3).max(10).required(),
        email: joi_1.default.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        }).required(),
        country: joi_1.default.string().min(3).max(15),
        phoneNumber: joi_1.default.string().min(3).max(15),
        title: joi_1.default.string().min(3).max(15),
        company: joi_1.default.string().min(3).max(15),
    });
    patchUserSchema = joi_1.default.object({
        firstName: joi_1.default.string().min(3).max(15),
        lastName: joi_1.default.string().min(3).max(15),
        userName: joi_1.default.string().min(3).max(15),
        email: joi_1.default.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        }),
        country: joi_1.default.string().min(3).max(15),
        phoneNumber: joi_1.default.string().min(3).max(15),
        title: joi_1.default.string().min(2).max(15),
        company: joi_1.default.string().min(3).max(15),
    });
    validateCreateUserPayload(payload) {
        const result = this.createUserSchema.validate(payload);
        if (result.error)
            throw new errors_1.ValidationError(result.error.message);
    }
    validatePatchUserPayload(payload) {
        const result = this.patchUserSchema.validate(payload);
        if (result.error)
            throw new errors_1.ValidationError(result.error.message);
    }
}
exports.default = new UserValidator();
//# sourceMappingURL=user.validator.js.map
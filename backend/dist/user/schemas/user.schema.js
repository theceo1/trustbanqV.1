"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    balance: { type: Number, required: true },
    googleId: { type: String },
});
exports.UserSchema = UserSchema;
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=user.schema.js.map
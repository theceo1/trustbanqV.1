"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/models/Wallet.ts
const mongoose_1 = __importDefault(require("mongoose"));
const walletSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
});
const Wallet = mongoose_1.default.model('Wallet', walletSchema);
exports.default = Wallet;

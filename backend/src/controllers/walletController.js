"use strict";
// backend/src/controllers/walletController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletBalance = void 0;
const walletService_1 = require("../services/walletService");
const getWalletBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authenticatedReq = req;
    try {
        if (!authenticatedReq.user || !authenticatedReq.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const userId = authenticatedReq.user._id.toString();
        const balance = yield (0, walletService_1.getBalance)(userId);
        return res.status(200).json({ balance });
    }
    catch (error) {
        console.error('Error fetching wallet balance:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.getWalletBalance = getWalletBalance;

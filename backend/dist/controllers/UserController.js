"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class UserController {
    // Consolidated method to fetch user profile
    static getUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log('Inside UserController.getUserProfile');
            // Use optional chaining to safely access user id
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            console.log('Extracted user ID:', userId);
            if (!userId) {
                console.log('No user ID found in request');
                return res.status(401).json({ message: 'Unauthorized' });
            }
            try {
                const user = yield User_1.default.findById(userId).select('-password');
                if (!user) {
                    console.log('User not found in database for ID:', userId);
                    return res.status(404).json({ message: 'User not found' });
                }
                console.log('Returning user profile for email:', user.email);
                res.json({ id: user._id, email: user.email, name: user.name });
            }
            catch (error) {
                console.error('Error fetching user profile:', error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
}
exports.default = UserController;

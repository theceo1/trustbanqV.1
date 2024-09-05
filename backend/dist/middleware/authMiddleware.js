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
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('authenticateToken middleware called');
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);
    if (!authHeader) {
        console.log('Authorization header is missing');
        return res.status(401).json({ message: 'Authorization header is required' });
    }
    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token);
    if (!token) {
        console.log('Token not provided');
        return res.status(401).json({ message: 'Token is required' });
    }
    try {
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not set');
            return res.status(500).json({ message: 'Internal server error: JWT secret is not configured' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded:', decoded);
        const user = yield User_1.default.findById(decoded._id);
        if (!user) {
            console.log('User not found with ID:', decoded._id);
            return res.status(401).json({ message: 'User not found' });
        }
        console.log('User authenticated:', user.email);
        req.user = user; // Attach user to request object
        next(); // Proceed to next middleware or route handler
    }
    catch (error) {
        console.error('Error authenticating token:', error);
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.authenticateToken = authenticateToken;

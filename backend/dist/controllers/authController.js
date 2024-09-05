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
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Register User
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Register User Controller called');
    const { email, password, name } = req.body;
    if (!email || !password) {
        console.log('Registration failed: Missing email or password');
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        let user = yield User_1.default.findOne({ email });
        if (user) {
            console.log('Registration failed: User already exists with email:', email);
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash password before saving
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        user = new User_1.default({
            email,
            password: hashedPassword,
            name,
        });
        yield user.save();
        console.log('User registered successfully:', email);
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.registerUser = registerUser;
// Login User
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Login User Controller called');
    const { email, password } = req.body;
    if (!email || !password) {
        console.log('Login failed: Missing email or password');
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            console.log('Login failed: No user found with email:', email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Compare hashed passwords
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            console.log('Login failed: Incorrect password for email:', email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = user.generateAuthToken();
        console.log('User logged in successfully:', email);
        res.json({ token });
    }
    catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.loginUser = loginUser;

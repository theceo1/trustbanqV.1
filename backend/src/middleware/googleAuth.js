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
// backend/src/middleware/googleAuth.ts
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const User_1 = __importDefault(require("../models/User"));
// Debugging logs to verify environment variables
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
    passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Log the profile information from Google
    console.log('Google Profile:', profile);
    try {
        let user = yield User_1.default.findOne({ googleId: profile.id });
        if (!user) {
            console.log('No user found, creating a new user');
            user = new User_1.default({
                googleId: profile.id,
                email: (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value,
                name: profile.displayName,
            });
            yield user.save();
            console.log("New user created:", user);
        }
        else {
            console.log('User found:', user);
        }
        done(null, user);
    }
    catch (error) {
        console.error('Error during Google OAuth callback:', error);
        done(error);
    }
})));
passport_1.default.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    done(null, user._id.toString());
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(id).exec();
        if (!user) {
            console.error('User not found during deserialization');
            return done(new Error('User not found'), null);
        }
        console.log('Deserialized user:', user);
        done(null, user);
    }
    catch (error) {
        console.error('Error during deserialization:', error);
        done(error, null);
    }
}));
exports.default = passport_1.default;

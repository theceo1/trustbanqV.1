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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const User_1 = __importDefault(require("../models/User"));
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.error('Google OAuth credentials are not set in environment variables');
    process.exit(1);
}
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('Google OAuth callback triggered');
    try {
        let user = yield User_1.default.findOne({ googleId: profile.id });
        if (!user) {
            console.log('No user found with Google ID:', profile.id);
            user = new User_1.default({
                email: (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value,
                googleId: profile.id,
                name: profile.displayName,
            });
            yield user.save();
            console.log('New user created:', user.email);
        }
        else {
            console.log('Existing user found:', user.email);
        }
        done(undefined, user); // Use undefined instead of null
    }
    catch (error) {
        console.error('Error in Google OAuth strategy:', error);
        done(error, undefined); // Use undefined instead of null
    }
})));
// Serialize and deserialize user instances to and from the session.
passport_1.default.serializeUser((user, done) => {
    done(undefined, user.id); // Use undefined instead of null
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(id);
        done(undefined, user); // Use undefined instead of null
    }
    catch (error) {
        done(error, undefined); // Use undefined instead of null
    }
}));
exports.default = passport_1.default;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleAuth_1 = __importDefault(require("../middleware/googleAuth"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// Registration route
router.post('/register', authController_1.registerUser);
// Login route
router.post('/login', authController_1.loginUser);
// Google OAuth login
router.get('/google', googleAuth_1.default.authenticate('google', { scope: ['profile', 'email'] }));
// Google OAuth callback
router.get('/google/callback', googleAuth_1.default.authenticate('google', { failureRedirect: '/login', session: false }), (req, res) => {
    const user = req.user;
    const token = user ? user.generateAuthToken() : null;
    if (token) {
        // Redirect with token in query params
        res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
    }
    else {
        res.redirect(`${process.env.FRONTEND_URL}/login`);
    }
});
exports.default = router;

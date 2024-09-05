"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/authRoutes.ts
const express_1 = __importDefault(require("express"));
const googleAuth_1 = __importDefault(require("../middleware/googleAuth"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = express_1.default.Router();
console.log('Defining routes in authRoutes.ts');
// Register Route
router.post('/register', (req, res, next) => {
    console.log('POST /register called');
    (0, authController_1.registerUser)(req, res, next);
});
// Login Route
router.post('/login', (req, res, next) => {
    console.log('POST /login called');
    (0, authController_1.loginUser)(req, res, next);
});
// User Profile Route
router.get('/user', authMiddleware_1.authenticateToken, (req, res, next) => {
    console.log('GET /user called');
    UserController_1.default.getUserProfile(req, res);
});
// Google OAuth Routes
router.get('/google', (req, res, next) => {
    console.log('GET /google called');
    googleAuth_1.default.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});
router.get('/google/callback', googleAuth_1.default.authenticate('google', { failureRedirect: '/login', session: false }), (req, res) => {
    const user = req.user;
    const token = user.generateAuthToken();
    console.log(`Token generated for user: ${user.email}`);
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
});
// Debug Route to List Registered Routes
router.get('/debug', (req, res) => {
    console.log('Debug route accessed');
    const registeredRoutes = router.stack
        .filter((layer) => layer.route)
        .map((layer) => ({
        path: layer.route.path,
        method: Object.keys(layer.route.methods)[0].toUpperCase()
    }));
    console.log('Registered Routes:', registeredRoutes);
    res.json({
        message: 'Debug route working',
        routes: registeredRoutes
    });
});
console.log('Auth routes module loaded');
exports.default = router;

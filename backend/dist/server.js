"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/server.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const googleAuth_1 = __importDefault(require("./middleware/googleAuth"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
console.log('Starting server setup...');
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(googleAuth_1.default.initialize());
app.use((0, morgan_1.default)('dev')); // Add request logging
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI || '')
    .then(() => {
    console.log('MongoDB connected');
    // Optionally, you can list connected databases or collections here
})
    .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
});
console.log('Adding auth routes...');
// Mount auth routes under /api/auth
app.use('/api/auth', authRoutes_1.default);
// Optional: Add a root route for testing
app.get('/', (req, res) => {
    console.log('GET / called');
    res.send('TrustBanq API is running.');
});
// Optional: Catch-all route for undefined endpoints
app.use((req, res) => {
    console.warn(`Undefined route accessed: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: 'Route not found' });
});
// Optional: Error-handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

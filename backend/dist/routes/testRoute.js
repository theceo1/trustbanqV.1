"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
console.log('Test route file is being executed');
router.get('/test', (req, res) => {
    console.log('Test route accessed');
    res.json({ message: 'Test route working' });
});
exports.default = router;

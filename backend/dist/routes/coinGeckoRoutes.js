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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/coinGeckoRoutes.ts
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const router = express_1.default.Router();
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
router.use(limiter);
const handleCoinGeckoRequest = (req, res, endpoint) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${COINGECKO_API_URL}${endpoint}`, { params: req.query });
        res.json(response.data);
    }
    catch (error) {
        console.error(`Error fetching data from CoinGecko: ${endpoint}`, error);
        res.status(500).json({ message: 'Error fetching data from CoinGecko' });
    }
});
router.get('/markets', (req, res) => handleCoinGeckoRequest(req, res, '/coins/markets'));
router.get('/market_chart', (req, res) => {
    const _a = req.query, { id } = _a, params = __rest(_a, ["id"]);
    handleCoinGeckoRequest(req, res, `/coins/${id}/market_chart`);
});
router.get('/search/trending', (req, res) => handleCoinGeckoRequest(req, res, '/search/trending'));
router.get('/global', (req, res) => handleCoinGeckoRequest(req, res, '/global'));
exports.default = router;

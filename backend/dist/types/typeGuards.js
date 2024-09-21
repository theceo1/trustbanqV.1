"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
exports.isWallet = isWallet;
function isUser(data) {
    return (typeof data === 'object' &&
        data !== null &&
        typeof data.id === 'string' &&
        typeof data.email === 'string' &&
        typeof data.password === 'string' &&
        typeof data.name === 'string' &&
        typeof data.created_at === 'string' &&
        (typeof data.googleId === 'string' || data.googleId === undefined));
}
function isWallet(data) {
    return (typeof data === 'object' &&
        data !== null &&
        typeof data.id === 'string' &&
        typeof data.userId === 'string' &&
        typeof data.balance === 'number');
}
//# sourceMappingURL=typeGuards.js.map
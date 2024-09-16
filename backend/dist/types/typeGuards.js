"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
exports.isWallet = isWallet;
function isUser(data) {
    return (typeof data === 'object' &&
        data !== null &&
        'id' in data &&
        'email' in data &&
        'password' in data &&
        'balance' in data);
}
function isWallet(data) {
    return (typeof data === 'object' &&
        data !== null &&
        'id' in data &&
        'userId' in data &&
        'balance' in data);
}
//# sourceMappingURL=typeGuards.js.map
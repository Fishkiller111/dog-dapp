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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.withdrawBalance = exports.balanceInquiry = void 0;
var trpc_1 = require("../../trpc");
var database_1 = require("database");
exports.balanceInquiry = trpc_1.protectedProcedure.query(function (_a) {
    var user = _a.ctx.user;
    return __awaiter(void 0, void 0, void 0, function () {
        var withdrawableBalance, pendingBalance, completedBalance;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, database_1.db.score.aggregate({
                        where: {
                            userId: user.id,
                            Status: "WITHDRAW_UNPAID"
                        },
                        _sum: {
                            Token: true
                        }
                    })];
                case 1:
                    withdrawableBalance = _b.sent();
                    return [4 /*yield*/, database_1.db.score.aggregate({
                            where: {
                                userId: user.id,
                                Status: "WITHDRAW_PENDING"
                            },
                            _sum: {
                                Token: true
                            }
                        })];
                case 2:
                    pendingBalance = _b.sent();
                    return [4 /*yield*/, database_1.db.score.aggregate({
                            where: {
                                userId: user.id,
                                Status: "WITHDRAW_COMPLETE"
                            },
                            _sum: {
                                Token: true
                            }
                        })];
                case 3:
                    completedBalance = _b.sent();
                    return [2 /*return*/, {
                            withdrawable: withdrawableBalance._sum.Token || 0,
                            pending: pendingBalance._sum.Token || 0,
                            completed: completedBalance._sum.Token || 0
                        }];
            }
        });
    });
});
exports.withdrawBalance = trpc_1.protectedProcedure.mutation(function (_a) {
    var user = _a.ctx.user;
    return __awaiter(void 0, void 0, void 0, function () {
        var withdrawableScores, totalWithdrawable, scoreIds_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, database_1.db.score.findMany({
                            where: {
                                userId: user.id,
                                Status: "WITHDRAW_UNPAID"
                            },
                            select: {
                                id: true,
                                Token: true
                            }
                        })];
                case 1:
                    withdrawableScores = _b.sent();
                    totalWithdrawable = withdrawableScores.reduce(function (sum, score) { return sum + score.Token; }, 0);
                    // 3. 检查是否达到最小提现额度
                    if (totalWithdrawable < 1000000) {
                        throw new Error("Insufficient balance. Minimum withdrawal amount is 1,000,000 tokens.");
                    }
                    console.log("User " + user.id + " is withdrawing " + totalWithdrawable + " tokens");
                    console.log("Affected records count: " + withdrawableScores.length);
                    scoreIds_1 = withdrawableScores.map(function (score) { return score.id; });
                    // 5. 使用事务来确保数据一致性
                    return [4 /*yield*/, database_1.db.$transaction(function (prisma) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: 
                                    // 首先将状态改为提现中
                                    return [4 /*yield*/, prisma.score.updateMany({
                                            where: {
                                                id: {
                                                    "in": scoreIds_1
                                                },
                                                // 双重检查，确保只更新未提现的记录
                                                Status: "WITHDRAW_UNPAID"
                                            },
                                            data: {
                                                Status: "WITHDRAW_PENDING"
                                            }
                                        })];
                                    case 1:
                                        // 首先将状态改为提现中
                                        _a.sent();
                                        // 模拟处理时间
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                                    case 2:
                                        // 模拟处理时间
                                        _a.sent();
                                        // 然后将状态改为提现完成
                                        return [4 /*yield*/, prisma.score.updateMany({
                                                where: {
                                                    id: {
                                                        "in": scoreIds_1
                                                    },
                                                    // 双重检查，确保只更新提现中的记录
                                                    Status: "WITHDRAW_PENDING"
                                                },
                                                data: {
                                                    Status: "WITHDRAW_COMPLETE"
                                                }
                                            })];
                                    case 3:
                                        // 然后将状态改为提现完成
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    // 5. 使用事务来确保数据一致性
                    _b.sent();
                    return [2 /*return*/, {
                            success: true,
                            message: "Withdrawal completed successfully",
                            amount: totalWithdrawable,
                            processedRecords: withdrawableScores.length
                        }];
                case 3:
                    error_1 = _b.sent();
                    // 错误处理
                    if (error_1 instanceof Error) {
                        throw new TypeError("Withdrawal failed: " + error_1.message);
                    }
                    throw new Error("An unexpected error occurred during withdrawal");
                case 4: return [2 /*return*/];
            }
        });
    });
});

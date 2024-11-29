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
exports.getRemainingScoreCount = exports.generateProductNames = void 0;
var path = require("node:path");
var fs = require("node:fs");
var zod_1 = require("zod");
var trpc_1 = require("../../trpc");
var server_1 = require("@trpc/server");
var database_1 = require("database");
var client_1 = require("@prisma/client"); // 或者从你定义这些枚举的地方导入
exports.generateProductNames = trpc_1.protectedProcedure
    .input(zod_1.z.object({
    audio: zod_1.z.string()
}))
    .output(zod_1.z.object({
    result: zod_1.z.boolean(),
    score: zod_1.z.number()
}))
    .query(function (_a) {
    var audio = _a.input.audio, user = _a.ctx.user;
    return __awaiter(void 0, void 0, void 0, function () {
        var scoreTotalCount, scoreCount, taskCount, uploadDir, filePath, fileBuffer, formData, apiUrl, response, tempData, data, res, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    scoreTotalCount = 10;
                    return [4 /*yield*/, database_1.db.score.count({
                            where: {
                                // 用户ID
                                userId: user.id,
                                // UTC时间，0时～24时
                                createdAt: {
                                    gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
                                    lt: new Date(new Date().setUTCHours(24, 0, 0, 0))
                                }
                            }
                        })];
                case 1:
                    scoreCount = _b.sent();
                    return [4 /*yield*/, database_1.db.task.count({
                            where: {
                                userId: user.id,
                                status: client_1.TaskStatus.DONE,
                                OR: [
                                    // 对于每日任务（签到和分享），只统计今天完成的
                                    {
                                        type: {
                                            "in": [
                                                client_1.TaskType.DAILY_CHECKIN,
                                                client_1.TaskType.SHARE_DISCORD,
                                                client_1.TaskType.SHARE_TELEGRAM,
                                            ]
                                        },
                                        createdAt: {
                                            gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
                                            lt: new Date(new Date().setUTCHours(24, 0, 0, 0))
                                        }
                                    },
                                    // 对于永久任务（加入Discord和Telegram），只要是今天完成的就统计
                                    {
                                        type: {
                                            "in": [client_1.TaskType.JOIN_DISCORD, client_1.TaskType.JOIN_TELEGRAM]
                                        },
                                        createdAt: {
                                            gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
                                            lt: new Date(new Date().setUTCHours(24, 0, 0, 0))
                                        }
                                    },
                                ]
                            }
                        })];
                case 2:
                    taskCount = _b.sent();
                    scoreTotalCount = scoreTotalCount + taskCount - scoreCount;
                    if (scoreTotalCount <= 0) {
                        throw new server_1.TRPCError({
                            code: "UNAUTHORIZED",
                            message: "No permission to process audio file"
                        });
                    }
                    uploadDir = path.join(process.cwd(), "../../.temp");
                    filePath = path.join(uploadDir, audio);
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 7, 8, 9]);
                    // 检查文件是否存在
                    if (!fs.existsSync(filePath)) {
                        throw new Error("File not found");
                    }
                    fileBuffer = fs.readFileSync(filePath);
                    formData = new FormData();
                    // 创建 Blob 并添加到 FormData
                    // const blob = new Blob([fileBuffer], { type: "audio/wav" }); // 根据实际音频类型调整
                    // formData.append("file", blob, path.basename(filePath));
                    formData.append("file", new Blob([fileBuffer]), "filename.wav");
                    apiUrl = process.env.AI_API_URL || "http://localhost:8000";
                    return [4 /*yield*/, fetch(apiUrl + "/predict", {
                            method: "POST",
                            body: formData
                        })["catch"](function (error) {
                            console.log(error);
                        })];
                case 4:
                    response = _b.sent();
                    if (!response) {
                        throw new Error("No response from AI server");
                    }
                    if (!response.ok) {
                        throw new Error("HTTP error! status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 5:
                    tempData = _b.sent();
                    data = {
                        result: tempData.result,
                        // 是狗叫就随机给1～5分，非狗叫就给0分
                        score: tempData.result === "非狗叫" ? 0 : Math.floor(Math.random() * 5) + 1
                    };
                    return [4 /*yield*/, database_1.db.score
                            .create({
                            data: {
                                userId: user.id,
                                score: data.score
                            }
                        })["catch"](function (error) {
                            console.error(error);
                        })];
                case 6:
                    res = _b.sent();
                    return [2 /*return*/, {
                            result: tempData.result === "非狗叫",
                            score: data.score
                        }];
                case 7:
                    error_1 = _b.sent();
                    console.error("Error:", error_1);
                    throw new server_1.TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Failed to process audio file"
                    });
                case 8:
                    // 在finally块中删除文件，确保无论成功还是失败都会执行
                    try {
                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath);
                        }
                    }
                    catch (deleteError) {
                        console.error("Error deleting temporary file:", deleteError);
                        // 不抛出删除文件的错误，因为主要操作已经完成
                    }
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
});
exports.getRemainingScoreCount = trpc_1.protectedProcedure
    .output(zod_1.z.object({
    remaining: zod_1.z.number(),
    total: zod_1.z.number(),
    used: zod_1.z.number(),
    taskBonus: zod_1.z.number()
}))
    .query(function (_a) {
    var user = _a.ctx.user;
    return __awaiter(void 0, void 0, void 0, function () {
        var scoreTotalCount, scoreCount, taskCount, totalCount, remainingCount;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    scoreTotalCount = 10;
                    return [4 /*yield*/, database_1.db.score.count({
                            where: {
                                userId: user.id,
                                createdAt: {
                                    gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
                                    lt: new Date(new Date().setUTCHours(24, 0, 0, 0))
                                }
                            }
                        })];
                case 1:
                    scoreCount = _b.sent();
                    return [4 /*yield*/, database_1.db.task.count({
                            where: {
                                userId: user.id,
                                status: client_1.TaskStatus.DONE,
                                OR: [
                                    // 对于每日任务（签到和分享），只统计今天完成的
                                    {
                                        type: {
                                            "in": [
                                                client_1.TaskType.DAILY_CHECKIN,
                                                client_1.TaskType.SHARE_DISCORD,
                                                client_1.TaskType.SHARE_TELEGRAM,
                                            ]
                                        },
                                        createdAt: {
                                            gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
                                            lt: new Date(new Date().setUTCHours(24, 0, 0, 0))
                                        }
                                    },
                                    // 对于永久任务（加入Discord和Telegram），只要是今天完成的就统计
                                    {
                                        type: {
                                            "in": [client_1.TaskType.JOIN_DISCORD, client_1.TaskType.JOIN_TELEGRAM]
                                        },
                                        createdAt: {
                                            gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
                                            lt: new Date(new Date().setUTCHours(24, 0, 0, 0))
                                        }
                                    },
                                ]
                            }
                        })];
                case 2:
                    taskCount = _b.sent();
                    totalCount = scoreTotalCount + taskCount;
                    remainingCount = totalCount - scoreCount;
                    return [2 /*return*/, {
                            remaining: Math.max(0, remainingCount),
                            total: totalCount,
                            used: scoreCount,
                            taskBonus: taskCount
                        }];
            }
        });
    });
});

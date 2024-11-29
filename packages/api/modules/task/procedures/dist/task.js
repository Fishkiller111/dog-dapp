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
exports.getTaskStatusList = exports.submitTasks = void 0;
var zod_1 = require("zod");
var trpc_1 = require("../../trpc");
var client_1 = require("@prisma/client"); // 或者从你定义这些枚举的地方导入
var database_1 = require("database");
exports.submitTasks = trpc_1.protectedProcedure
    .input(zod_1.z.object({
    taskType: zod_1.z.nativeEnum(client_1.TaskType)
}))
    .mutation(function (_a) {
    var taskType = _a.input.taskType, user = _a.ctx.user;
    return __awaiter(void 0, void 0, void 0, function () {
        var userId, PERMANENT_TASKS, getUSDayRange, isPermanentTask, existingTask, _b, dayStart, dayEnd, todayTask, task;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    userId = user.id;
                    PERMANENT_TASKS = [
                        client_1.TaskType.JOIN_DISCORD,
                        client_1.TaskType.JOIN_TELEGRAM,
                    ];
                    getUSDayRange = function () {
                        var now = new Date();
                        // 将当前时间转换为美国东部时间
                        var usDate = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
                        var startOfDay = new Date(usDate);
                        startOfDay.setHours(0, 0, 0, 0);
                        var endOfDay = new Date(usDate);
                        endOfDay.setHours(23, 59, 59, 999);
                        // 转换回 UTC 时间进行数据库查询
                        return {
                            start: new Date(startOfDay),
                            end: new Date(endOfDay)
                        };
                    };
                    isPermanentTask = PERMANENT_TASKS.includes(taskType);
                    if (!isPermanentTask) return [3 /*break*/, 2];
                    return [4 /*yield*/, database_1.db.task.findFirst({
                            where: {
                                userId: userId,
                                type: taskType,
                                status: client_1.TaskStatus.DONE
                            }
                        })];
                case 1:
                    existingTask = _c.sent();
                    if (existingTask) {
                        throw new Error("This permanent task has already been completed");
                    }
                    return [3 /*break*/, 4];
                case 2:
                    _b = getUSDayRange(), dayStart = _b.start, dayEnd = _b.end;
                    return [4 /*yield*/, database_1.db.task.findFirst({
                            where: {
                                userId: userId,
                                type: taskType,
                                status: client_1.TaskStatus.DONE,
                                createdAt: {
                                    gte: dayStart,
                                    lte: dayEnd
                                }
                            }
                        })];
                case 3:
                    todayTask = _c.sent();
                    if (todayTask) {
                        throw new Error("This daily task has already been completed today");
                    }
                    _c.label = 4;
                case 4: return [4 /*yield*/, database_1.db.task.create({
                        data: {
                            userId: userId,
                            type: taskType,
                            status: client_1.TaskStatus.DONE
                        }
                    })];
                case 5:
                    task = _c.sent();
                    return [2 /*return*/, {
                            success: true,
                            task: task
                        }];
            }
        });
    });
});
exports.getTaskStatusList = trpc_1.protectedProcedure.query(function (_a) {
    var user = _a.ctx.user;
    return __awaiter(void 0, void 0, void 0, function () {
        var userId, PERMANENT_TASKS, DAILY_TASKS, getUSDayRange, permanentTasksStatus, _b, dayStart, dayEnd, dailyTasksStatus, completedPermanentTasks_1, completedDailyTasks_1, taskStatusList, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    userId = user.id;
                    PERMANENT_TASKS = [
                        client_1.TaskType.JOIN_DISCORD,
                        client_1.TaskType.JOIN_TELEGRAM,
                    ];
                    DAILY_TASKS = [
                        client_1.TaskType.DAILY_CHECKIN,
                        client_1.TaskType.SHARE_DISCORD,
                        client_1.TaskType.SHARE_TELEGRAM,
                    ];
                    getUSDayRange = function () {
                        var now = new Date();
                        // 将当前时间转换为美国东部时间
                        var usDate = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
                        var startOfDay = new Date(usDate);
                        startOfDay.setHours(0, 0, 0, 0);
                        var endOfDay = new Date(usDate);
                        endOfDay.setHours(23, 59, 59, 999);
                        // 转换回 UTC 时间进行数据库查询
                        return {
                            start: new Date(startOfDay),
                            end: new Date(endOfDay)
                        };
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, database_1.db.task.findMany({
                            where: {
                                userId: userId,
                                type: {
                                    "in": PERMANENT_TASKS
                                },
                                status: client_1.TaskStatus.DONE
                            },
                            select: {
                                type: true
                            }
                        })];
                case 2:
                    permanentTasksStatus = _c.sent();
                    _b = getUSDayRange(), dayStart = _b.start, dayEnd = _b.end;
                    return [4 /*yield*/, database_1.db.task.findMany({
                            where: {
                                userId: userId,
                                type: {
                                    "in": DAILY_TASKS
                                },
                                status: client_1.TaskStatus.DONE,
                                createdAt: {
                                    gte: dayStart,
                                    lte: dayEnd
                                }
                            },
                            select: {
                                type: true
                            }
                        })];
                case 3:
                    dailyTasksStatus = _c.sent();
                    completedPermanentTasks_1 = new Set(permanentTasksStatus.map(function (task) { return task.type; }));
                    completedDailyTasks_1 = new Set(dailyTasksStatus.map(function (task) { return task.type; }));
                    taskStatusList = Object.values(client_1.TaskType).map(function (taskType) { return ({
                        type: taskType,
                        status: PERMANENT_TASKS.includes(taskType)
                            ? completedPermanentTasks_1.has(taskType)
                                ? client_1.TaskStatus.DONE
                                : client_1.TaskStatus.PENDING
                            : completedDailyTasks_1.has(taskType)
                                ? client_1.TaskStatus.DONE
                                : client_1.TaskStatus.PENDING
                    }); });
                    return [2 /*return*/, taskStatusList];
                case 4:
                    error_1 = _c.sent();
                    console.error("Error getting task status list:", error_1);
                    throw new Error("Failed to get task status list");
                case 5: return [2 /*return*/];
            }
        });
    });
});

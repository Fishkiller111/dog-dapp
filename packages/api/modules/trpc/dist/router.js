"use strict";
exports.__esModule = true;
exports.apiRouter = void 0;
var adminProcedures = require("../admin/procedures");
var aiProcedures = require("../ai/procedures");
var authProcedures = require("../auth/procedures");
var billingProcedures = require("../billing/procedures");
var newsletterProcedures = require("../newsletter/procedures");
var teamProcedures = require("../team/procedures");
var uploadsProcedures = require("../uploads/procedures");
var taskProcedures = require("../task/procedures");
var trpc_1 = require("./trpc");
exports.apiRouter = trpc_1.router({
    auth: trpc_1.router(authProcedures),
    billing: trpc_1.router(billingProcedures),
    team: trpc_1.router(teamProcedures),
    newsletter: trpc_1.router(newsletterProcedures),
    ai: trpc_1.router(aiProcedures),
    uploads: trpc_1.router(uploadsProcedures),
    admin: trpc_1.router(adminProcedures),
    task: trpc_1.router(taskProcedures)
});

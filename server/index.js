"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 建立express服务器
// import express from 'express';
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const path = __importStar(require("path"));
// cors
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
/// 解析请求体
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// 路由
const router_1 = require("./router");
app.use(router_1.router);
// 静态资源
// 测试用
// 正式用
app.use(express_1.default.static(path.join(__dirname, "../dist")));
// 错误处理，收集错误信息，并返回给前端
app.use(function (err, req, res, next) {
    res.status(500).json({
        status: -1,
        msg: err.message
    });
});
// 404
app.use(function (req, res, next) {
    // 返回index.html
    // 测试用
    // 正式用
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.listen(port, () => console.log(`Example app listening on http://127.0.0.1:3000`));

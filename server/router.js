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
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// 业务
const FILE = __importStar(require("./file"));
const express = __importStar(require("express"));
// const express = require('express');
const router = express.Router();
exports.router = router;
// 获取餐厅列表
router.get('/restaurants', async (req, res) => {
    let data = await FILE.getRestarunts();
    res.send({
        status: 0,
        data,
        msg: "获取成功"
    });
});
// 添加餐厅选项
router.post('/restaurant', async (req, res, next) => {
    try {
        let { restarunt, qid } = req.body;
        if (!restarunt || !qid) {
            throw new Error("参数错误");
        }
        let data = await FILE.addRestarunt(restarunt, qid);
        res.send({
            status: 0,
            data,
            msg: "添加成功"
        });
    }
    catch (err) {
        next(err); // 将错误传递给错误处理中间件
    }
});
// 选择餐厅
router.get('/restarunts/select', async (req, res, next) => {
    try {
        let { rid, qid } = req.query;
        // 
        if (!rid || !qid) {
            throw new Error("参数错误");
        }
        if (typeof rid != "string" || typeof qid != "string") {
            throw new Error("参数错误");
        }
        let data = await FILE.selectRestarunt(rid, qid);
        res.send({
            status: 0,
            data,
            msg: "选择成功"
        });
    }
    catch (err) {
        next(err); // 将错误传递给错误处理中间件
    }
});
// 清除餐厅列表
router.get('/clearRestarunts', async (req, res, next) => {
    try {
        let { password } = req.query;
        if (password != "clearRestarunts") {
            throw new Error("密码错误");
        }
        let data = await FILE.clearRestarunts();
        res.send({
            status: 0,
            data,
            msg: "清除成功"
        });
    }
    catch (err) {
        next(err); // 将错误传递给错误处理中间件
    }
});

// 业务
import * as FILE from './file'
import * as express from 'express';
// const express = require('express');
const router = express.Router();
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
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
        next(err); // 将错误传递给错误处理中间件
    }
});


export { router };
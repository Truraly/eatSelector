"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearRestarunts = exports.selectRestarunt = exports.addRestarunt = exports.getRestarunts = void 0;
// 读取和存入文件
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// 测试用
// 正式用
const dataPath = path_1.default.resolve(__dirname, "../data/restarunts.json");
const getRestarunts = async () => {
    let res = await readRestarunts();
    return res;
};
exports.getRestarunts = getRestarunts;
const addRestarunt = async (restarunt_, qid) => {
    let res = await readRestarunts();
    // 检查是否为空
    if (!restarunt_) {
        throw new Error("餐厅名不能为空");
    }
    // 检查是否已经存在
    for (let i = 0; i < res.length; i++) {
        if (res[i].rname == restarunt_) {
            throw new Error("已经存在该餐厅");
        }
    }
    res.push({
        rname: restarunt_,
        setter: qid,
        checkarr: [],
    });
    await writeRestarunts(res);
    return res;
};
exports.addRestarunt = addRestarunt;
const selectRestarunt = async (rname, qid) => {
    let res = await readRestarunts();
    // 检查这家餐厅是否存在
    let flag = false;
    for (let i = 0; i < res.length; i++) {
        if (res[i].rname == rname) {
            flag = true;
            // 检查是否已经选择过
            if (res[i].checkarr.includes(qid)) {
                // 删除选择
                res[i].checkarr = res[i].checkarr.filter((item) => item != qid);
            }
            else {
                // 添加选择
                res[i].checkarr.push(qid);
            }
            break;
        }
    }
    if (!flag) {
        throw new Error("不存在该餐厅");
    }
    await writeRestarunts(res);
    return res;
};
exports.selectRestarunt = selectRestarunt;
// 清除结果，需要密码
const clearRestarunts = async () => {
    let res = await readRestarunts();
    // 清空所有选择
    for (let i = 0; i < res.length; i++) {
        res[i].checkarr = [];
    }
    await writeRestarunts(res);
    return res;
};
exports.clearRestarunts = clearRestarunts;
const readRestarunts = async () => {
    // 如果文件不存在，创建文件
    if (!fs_1.default.existsSync(dataPath)) {
        fs_1.default.writeFileSync(dataPath, "[]", { encoding: "utf-8" });
    }
    let res = fs_1.default.readFileSync(dataPath, { encoding: "utf-8" });
    return JSON.parse(res);
};
const writeRestarunts = async (data) => {
    // 如果文件不存在，创建文件
    if (!fs_1.default.existsSync(dataPath)) {
        fs_1.default.writeFileSync(dataPath, "[]", { encoding: "utf-8" });
    }
    fs_1.default.writeFileSync(dataPath, JSON.stringify(data), { encoding: "utf-8" });
};

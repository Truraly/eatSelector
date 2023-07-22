// 读取和存入文件
import path from "path";
import fs from 'fs';

// 测试用
// 正式用
const dataPath = path.resolve(__dirname, "../data/restarunts.json")


interface restarunt {
    rname: string,// 饭店名
    setter: string,// 提出者
    checkarr: string[],// 选择者名单
}

export const getRestarunts = async (): Promise<restarunt[]> => {
    let res = await readRestarunts();
    return res;
}

export const addRestarunt = async (restarunt_: string, qid: string) => {
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
}

export const selectRestarunt = async (rname: string, qid: string) => {
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
}

// 清除结果，需要密码
export const clearRestarunts = async () => {
    let res = await readRestarunts();
    // 清空所有选择
    for (let i = 0; i < res.length; i++) {
        res[i].checkarr = [];
    }
    await writeRestarunts(res);
    return res;
}

const readRestarunts = async (): Promise<restarunt[]> => {
    // 如果文件不存在，创建文件
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, "[]", { encoding: "utf-8" });
    }
    let res = fs.readFileSync(dataPath, { encoding: "utf-8" });
    return JSON.parse(res);
}

const writeRestarunts = async (data: restarunt[]) => {
    // 如果文件不存在，创建文件
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, "[]", { encoding: "utf-8" });
    }
    fs.writeFileSync(dataPath, JSON.stringify(data), { encoding: "utf-8" });
}




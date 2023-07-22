import axios from 'axios';
// const _BASEURL = 'http://127.0.0.1:4523/m1/1483344-0-default';
// const _BASEURL = 'http://127.0.0.1:3000'
const _BASEURL = "http://" + window.location.hostname + ":3000";


// 选择/取消选择某个选项
export const selectRestarunt = async (rid: string, qid: string) => {
    let res = await axios.get(`${_BASEURL}/restarunts/select?qid=${qid}&rid=${rid}`);
    if (res.data.status == "0") {
        return res.data.data;
    } else {
        throw new Error("选择餐厅出错：" + res.data.msg);
    }
}
// 添加餐厅选项
export const addRestarunt = async (restarunt_: string, qid: string) => {
    let res = await axios.post(`${_BASEURL}/restaurant`, { restarunt: restarunt_, qid });
    console.log("添加餐厅选项res", res)
    if (res.data.status == "0") {
        return res.data.data;
    } else {
        throw new Error("添加餐厅选项出错：" + res.data.msg);
    }
}

// 清除结果，需要密码
export const clearRestarunts = async (password: string) => {
    let res = await axios.get(`${_BASEURL}/clearRestarunts?password=${password}`);
    if (res.data.status == "0") {
        return res.data.data;
    } else {
        throw new Error("清除餐厅列表出错：" + res.data.msg);
    }
}

// 本地测试
// http://127.0.0.1:4523/m1/1483344-0-default/restarunts
// 获取选项列表
export const getRestarunts = async (): Promise<restarunt[]> => {
    let res = await axios.get(`${_BASEURL}/restaurants`);
    if (res.data.status == "0") {
        return res.data.data;
    } else {
        throw new Error("餐厅列表获取出错：" + res.data.msg);
    }
}



// 饭店选项
interface restarunt {
    rname: string,// 饭店名
    setter: string,// 提出者
    checkarr: string[],// 选择者名单
}


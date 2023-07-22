// 建立express服务器
// import express from 'express';
import express from 'express';
const app = express();
const port = 3000;
import * as path from 'path';
// cors
import cors from 'cors';
app.use(cors());
/// 解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 路由
import { router } from './router';
app.use(router);

// 静态资源
// 测试用
// 正式用
app.use(express.static(path.join(__dirname, "../dist")));



// 错误处理，收集错误信息，并返回给前端
app.use(function (err: { message: any; }, req: any, res: any, next: any) {
    res.status(500).json({
        status: -1,
        msg: err.message
    });
});


// 404
app.use(function (req: any, res: any, next: any) {
    // 返回index.html
    // 测试用
    // 正式用
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => console.log(`Example app listening on http://127.0.0.1:3000`));
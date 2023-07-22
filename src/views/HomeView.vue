<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import { useUserStore } from '../stores/user'
import { useRouter, useRoute } from 'vue-router'
import * as API from '../api/api'
const router = useRouter()
console.log("qid:", useUserStore().qid)
console.log(useUserStore().isLogin)
if (!useUserStore().isLogin) {
    router.push({ name: 'login' })
}
// 饭店选项
interface restarunt {
    rname: string,// 饭店名
    setter: string,// 提出者
    checkarr: string[],// 选择者名单
}

import { ref, computed } from 'vue'
import * as api from '@/api/api'
const rlist = ref<restarunt[]>([])
// 选择最多的饭店的人数
const maxSelect = computed(() => {
    if (rlist.value.length == 0) {
        return -1
    }
    let _max = rlist.value[0].checkarr.length
    rlist.value.forEach((item: restarunt) => {
        if (item.checkarr.length > _max) {
            _max = item.checkarr.length
        }
    })

    return _max == 0 ? -1 : _max
})
function init() {
    api.getRestarunts().then((res) => {
        // console.log("res:", res)
        // 对res根据选择人数排序
        res.sort((a: any, b: any) => {
            return b.checkarr.length - a.checkarr.length
        })
        // console.log("res", res)
        rlist.value = res
    })
}
init()
setInterval(() => {
    init()
}, 1000 * 10)
// 选择饭店
function add(Restarunt: restarunt) {
    // 如果已经选择了饭店，就不添加
    if (Restarunt.checkarr.includes(useUserStore().qid)) {

        return
    }
    // Restarunt.checkarr.push(useUserStore().qid)
    API.selectRestarunt(Restarunt.rname, useUserStore().qid).then((res) => {
        console.log("选择饭店res:", res)
        init()
    })
}

//  取消选择饭店
function remove(Restarunt: restarunt) {
    // 如果没有选择饭店，就不取消
    if (!Restarunt.checkarr.includes(useUserStore().qid)) {
        return
    }
    // Restarunt.checkarr = Restarunt.checkarr.filter((item: string) => {
    //     return item != useUserStore().qid
    // })
    API.selectRestarunt(Restarunt.rname, useUserStore().qid).then((res) => {
        console.log("取消选择饭店res:", res)
        init()
    })
}

// 添加饭店
const restaruntNameAdd = ref<string>("")
function addRestarunt() {
    if (restaruntNameAdd.value == "") {
        alert("饭店名不能为空")
        return
    }
    else {
        API.addRestarunt(restaruntNameAdd.value, useUserStore().qid).then((res) => {
            console.log("添加饭店res:", res)
            init()
        })
        // 重置输入框
        restaruntNameAdd.value = ''
    }
}

// 清空选项
const adminPassword = ref<string>("")
function clear() {
    if (adminPassword.value == "") {
        alert("密码不能为空")
        return
    }
    // 跳出确认框
    if (!confirm("确定要清空吗？")) {
        return
    }
    try {
        API.clearRestarunts(adminPassword.value).then((res) => {
            console.log("清空选项res:", res)
            init()
        })
    }
    catch (e) {
        alert("密码错误")
    }
    finally {
        adminPassword.value = ''
    }
}

</script>

<template >
    <div class="m">
        <h1>吃饭投票器</h1>
        <!-- 如果是排名第一则特殊标记 -->
        <div v-for="r in rlist" :class="`item` + (r.checkarr.length == maxSelect ? ` top` : ``)">
            <h3>{{ r.rname }}</h3>
            <p>该选项由<img class="setter" :src="`https://q1.qlogo.cn/g?b=qq&nk=${r.setter}&s=640`" alt="">提供</p>
            <p>selecter: {{ r.checkarr.length }}</p>
            <ul>
                <li v-for="q in r.checkarr"> <img class="card-avatar" :src="`https://q1.qlogo.cn/g?b=qq&nk=${q}&s=640`"
                        alt="">
                </li>
            </ul>
            <button v-if="r.checkarr.includes(useUserStore().qid)" class="select isselect"
                @click="remove(r)">不想吃了</button>
            <button v-else class="select notselect" @click="add(r)">我要吃这个</button>
        </div>

        <div class="item con">

            <!-- 添加饭店 -->
            <input type="text" v-model="restaruntNameAdd">
            <button @click="addRestarunt()">添加饭店</button>
            <br>
            <!-- 清空按钮 -->
            <!-- <button v-if="useUserStore().qid == '1293915326'">清空饭店</button> -->

            <!-- 输入密码 -->
            <div v-if="useUserStore().qid == '1293915326'">
                <input type="text" v-model="adminPassword">
                <button @click="clear()">清空投票</button>
            </div>


        </div>
    </div>
</template>

<style scoped>
li {
    /* 黑色原点 */
    /* list-style: disc; */
    margin-right: 5px;
    display: inline-block;
}


.card-avatar {
    --size: 30px;
    background: linear-gradient(to top, #f1e1c1 0%, #fcbc97 100%);
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    transition: transform .2s ease;
    margin-bottom: 1rem;
}

img.setter {
    --size: 20px;
    background: linear-gradient(to top, #f1e1c1 0%, #fcbc97 100%);
    width: var(--size);
    height: var(--size);
    border-radius: 10%;
    transition: transform .2s ease;
    /* margin-bottom: 1rem; */
    /* 黑色边框 */
    border: 2px solid rgb(251, 0, 255);
}




div.item {
    background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
    margin-top: 20px;
    /* margin-bottom: 10px; */
    /* 圆角 */
    border-radius: 10px;
    padding: 10px;
}

div.top {
    background-image: linear-gradient(to left, #f83600 0%, #f9d423 100%);
}

/* div.m h1+div.item~div.item {
    
} */

.select {
    border-radius: 10px;
    height: 40px;

}

.isselect {
    background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);
}

.notselect {
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}

div.con button {
    border-radius: 10px;
    height: 30px;
    margin: 10px;
    /* display: block; */
}

div.con input {
    border-radius: 10px;
    height: 30px;
    margin: 0px 0px 0px 10px;
    padding: 5px;
}
</style>
<style>
#app {
    /* background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%); */

    background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
    background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
}
</style>
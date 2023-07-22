import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const qid = ref('')

    // getters
    const isLogin = computed(() => qid.value !== '')
    // actions
    function login(qid_str: string) {
        qid.value = qid_str
    }
    // actions
    function logout() {
        qid.value = ''
    }
    // 获取QQ头像链接
    function getQQAvatar() {
        if (!isLogin.value) return ''
        return `https://q1.qlogo.cn/g?b=qq&nk=${qid.value}&s=640`
    }

    return {
        qid,
        isLogin,
        login,
        logout,
        getQQAvatar
    }
})

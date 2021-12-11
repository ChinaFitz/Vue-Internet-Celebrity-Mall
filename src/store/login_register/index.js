import { 
    getCaptcha,
    register,
    login,
    getUserInfo,
    logout,
} from "@/api"

export default {
    state: {
        userInfo: {},
    },
    actions: {
        async getCaptcha({ commit }, {phone}) {
            let r = await getCaptcha(phone).catch(()=>{alert("获取手机验证码失败...")})
            if (r.code === 200) {
                return r.data
            }else {
                throw "获取手机验证码失败..."
            }
        },
        async register({ commit }, params) {
            let r = await register(params).catch(()=>{alert("注册用户失败...")})
            if (r.code === 200) {
                return r
            }else {
                throw r.message
            }
        },
        async login({ commit }, params) {
            let r = await login(params).catch(()=>{alert("用户登录失败...")})
            if (r.code === 200) {
                // 成功登录后持久化储存token
                localStorage.setItem("TOKEN", r.data.token)
                return r.data
            }else {
                throw r.message
            }
        },
        // 根据token识别出用户
        async getUserInfo({ commit }) {
            let r = await getUserInfo().catch(()=>{alert("获取用户信息失败...")})
            if (r.code === 200) {
                commit("GETUSERINFO", {userInfo: r.data})
                return r.data
            }else {
                throw r.message
            }
        },
        // 用户退出登录
        async logout({ commit }) {
            let r = await logout().catch(()=>{alert("用户退出登录失败...")})
            if (r.code === 200) {
                commit("LOGOUT")
                localStorage.removeItem("TOKEN")
                return r.data
            }else {
                throw r.message
            }
        },
    },
    mutations: {
        GETUSERINFO(state, {userInfo}) {
            state.userInfo = userInfo
        },
        LOGOUT(state) {
            state.userInfo = {}
        },
    },
    getters: {
        
    },
};

import { 
    getCaptcha,
    register,
} from "@/api"

export default {
    state: {

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
                throw "注册用户失败..."
            }
        },
    },
    mutations: {
        
    },
    getters: {
        
    },
};

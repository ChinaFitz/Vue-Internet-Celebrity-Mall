import { 
    getPaymentInfo,
    get_pay_status,
} from "@/api"

export default {
    state: {
        payInfo: {},
    },
    actions: {
        async getPaymentInfo({ commit }, orderId) {
            let r = await getPaymentInfo(orderId).catch(()=>{alert("获取用于支付的订单信息失败...")})
            if (r.code === 200) {
                commit("SETPAYMENTINFO", {payInfo: r.data})
            }else {
                throw r.message
            }
        },
        async get_pay_status({ commit }, orderId) {
            let r = await get_pay_status(orderId).catch(()=>{alert("获取订单支付状态失败...")})
            return r
        },
    },
    mutations: {
        SETPAYMENTINFO(state, {payInfo}) {
            state.payInfo = payInfo || {}
        },
    },
    getters: {
        
    },
};

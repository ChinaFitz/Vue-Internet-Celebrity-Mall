import { 
    getUserAddress,
    getOrderInfo,
    commit_order,
} from "@/api"

export default {
    state: {
        addressList: {},
        detail: {},
        detailArrayList: [],
        orderId: 0,
    },
    actions: {
        async getUserAddress({ commit }) {
            let r = await getUserAddress().catch(()=>{alert("获取用户常用地址失败...")})
            if (r.code === 200) {
                commit("GETUSERADDRESS", {addressList: r.data})
            }else {
                throw r.message
            }
        },
        async getOrderInfo({ commit }) {
            let r = await getOrderInfo().catch(()=>{alert("获取用户购物订单失败...")})
            if (r.code === 200) {
                commit("GETDETAILARRAYLIST", {detailArrayList: r.data.detailArrayList})
                commit("GETORDERINFO", {detail: r.data})
            }else {
                throw r.message
            }
        },
        async commit_order({ commit }, {tradeNo, tradeInfo}) {
            let r = await commit_order(tradeNo, tradeInfo).catch(()=>{alert("获取用户购物订单失败...")})
            if (r.code === 200) {
                commit("SETORDERID", {orderId: r.data})
                return r.code
            }else {
                throw r.message
            }
        },
        
    },
    mutations: {
        GETUSERADDRESS(state, {addressList}) {
            state.addressList = addressList || {}
        },
        GETORDERINFO(state, {addressList}) {
            state.addressList = addressList || {}
        },
        GETDETAILARRAYLIST(state, {detailArrayList}) {
            state.detailArrayList = detailArrayList || []
        },
        GETORDERINFO(state, {detail}) {
            state.detail = detail || {}
        },
        SETORDERID(state, {orderId}) {
            state.orderId = orderId || 0
        },
    },
    getters: {
        
    },
};

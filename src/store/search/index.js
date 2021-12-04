import { 
    searchGoodsInfo
} from "@/api"

export default {
    state: {
        goodsInfo: {}
    },
    actions: {
        async getGoodsInfo({commit}, require_field = {}) {
            let r = await searchGoodsInfo(require_field).catch(()=>{alert("获取商品信息失败...")})
            commit("GETGOODSINFO", {goodsInfo: r.data})
        },
    },
    mutations: {
        GETGOODSINFO(state, {goodsInfo}) {
            state.goodsInfo = goodsInfo
        },
    },
    getters: {
        goodsList(state) {
            return state.goodsInfo.goodsList || []
        },
        attrsList(state) {
            return state.goodsInfo.attrsList || []
        },
        trademarkList(state) {
            return state.goodsInfo.trademarkList || []
        },
    },
};

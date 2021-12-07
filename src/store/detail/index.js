import { 
    getGoodDetail
} from "@/api"

export default {
    state: {
        good_detail: {}
    },
    actions: {
        async getGoodDetail({ commit }, skuid) {
            let r = await getGoodDetail(skuid)
            if (r.code === 200) {
                commit("GETGOODDETAIL", {good_detail: r.data})
            }else {
                alert("商品详情接口获取信息失败...")
            }
        },
    },
    mutations: {
        GETGOODDETAIL(state, {good_detail}) {
            state.good_detail = good_detail
        }
    },
    getters: {
        categoryView(state) {
            return state?.good_detail?.categoryView || {}
        },
        price(state) {
            return state?.good_detail?.price || 0
        },
        skuInfo(state) {
            return state?.good_detail?.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state?.good_detail?.spuSaleAttrList || []
        },
        valuesSkuJson(state) {
            return state?.good_detail?.valuesSkuJson || ""
        },
    },
};

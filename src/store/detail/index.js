import { 
    getGoodDetail,
    addGoodToCar,
} from "@/api"

import { gen_uuid } from "@/utils/gen_uuid"

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
        async addGoodToCar({ commit }, {want_num: skuNum, skuId: skuid}) {
            // 该游客意图购买商品, 生成uuid
            gen_uuid()
            let r = await addGoodToCar(skuid, skuNum)
            if (r.code === 200) {
                return "ok"
            }else {
                throw "商品加入购物车失败..."
            }
        },
    },
    mutations: {
        GETGOODDETAIL(state, {good_detail}) {
            state.good_detail = good_detail
        },
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

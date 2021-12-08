import { 
    getCart,
    deleteGood,
    changeSelect,
} from "@/api"

export default {
    state: {
       personal_cart_data: [],
    },
    actions: {
        async getCart({ commit }) {
            let r = await getCart().catch(()=>{alert("获取购物车中已加入商品的信息失败...")})
            commit("GETCARTDATA", {cartInfoList: r.data[0]?.cartInfoList})
        },
        async deleteGood({ commit }, skuid) {
            let r = await deleteGood(skuid).catch(()=>{alert("删除购物车中的商品失败...")})
            if (r.code === 200) {
                return "ok"
            }else {
                throw "删除购物车中的商品失败..."
            }
        },
        async deleteAllChecked({ state, dispatch }) {
            const cart_list = state.personal_cart_data
            let promiseArr = []
            cart_list.forEach(
                each_good => {
                    if(each_good.isChecked) {
                        promiseArr.push(dispatch("deleteGood", each_good.skuId))
                    }
                }
            )

            return Promise.all(promiseArr)
        },
        async changeSelect(context, {skuid, isChecked}) {
            let r = await changeSelect(skuid, isChecked)
            if (r.code === 200) {
                return "ok"
            }else {
                throw "改变购物车中所有的商品状态失败..."
            }
        },
        async selectAll({ state, dispatch }, bool) {
            const cart_list = state.personal_cart_data
            let promiseArr = []
            cart_list.forEach(
                each_good => promiseArr.push(dispatch("changeSelect", {skuid: each_good.skuId, isChecked: Number(bool)}))
            )
            return Promise.all(promiseArr)
        },
        
    },
    mutations: {
        GETCARTDATA(state, {cartInfoList}) {
            state.personal_cart_data = cartInfoList || []
        },
    },
    getters: {
        
    },
};

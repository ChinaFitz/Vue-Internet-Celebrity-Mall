import { reqgetCategoryList } from "@/api"

export default {
    state: {
        reqgetCategoryList: [],
    },
    actions: {
        async getCategoryList({commit}) {
            let r = await reqgetCategoryList().catch(()=>{alert("获取三级商品菜单失败...")})
            commit("GETCATEGORYLIST", {categoryList: r.data})
        }
    },
    mutations: {
        GETCATEGORYLIST(state, {categoryList}) {
            state.reqgetCategoryList = categoryList
        }
    },
    getters: {},
};

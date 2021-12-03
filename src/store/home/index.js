import { 
    reqgetCategoryList,
    Carousel,
} from "@/api"

export default {
    state: {
        reqgetCategoryList: [],
        carousel_list: [],
    },
    actions: {
        async getCategoryList({commit}) {
            let r = await reqgetCategoryList().catch(()=>{alert("获取三级商品菜单失败...")})
            commit("GETCATEGORYLIST", {categoryList: r.data})
        },
        async get_carousel_list({commit}) {
            let r = await Carousel().catch(()=>{alert("获取轮播图失败...")})
            commit("Carousel", {carousel_list: r.data})
        },
    },
    mutations: {
        GETCATEGORYLIST(state, {categoryList}) {
            state.reqgetCategoryList = categoryList
        },
        Carousel(state, {carousel_list}) {
            state.carousel_list = carousel_list
        },
    },
    getters: {},
};

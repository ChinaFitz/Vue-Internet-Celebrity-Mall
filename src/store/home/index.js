import { 
    reqgetCategoryList,
    Carousel,
    Floor,
} from "@/api"

export default {
    state: {
        reqgetCategoryList: [],
        carousel_list: [],
        floor_list: [],
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
        async getFloorList({commit}) {
            let r = await Floor().catch(()=>{alert("获取底部Floor烧水壶轮播图失败...")})
            commit("GETFLOORLIST", {floor_list: r.data})
        },
    },
    mutations: {
        GETCATEGORYLIST(state, {categoryList}) {
            state.reqgetCategoryList = categoryList || []
        },
        Carousel(state, {carousel_list}) {
            state.carousel_list = carousel_list || []
        },
        GETFLOORLIST(state, {floor_list}) {
            state.floor_list = floor_list || []
        },
    },
    getters: {},
};

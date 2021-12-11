import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入路由组件
import Login from "@/views/Login"
import Register from "@/views/Register"
import Home from "@/views/Home"
import Search from "@/views/Search"
import Detail from "@/views/Detail"
import AddCartSuccess from "@/views/AddCartSuccess"
import ShopCart from "@/views/ShopCart"

import Store from "@/store"



// ================================ 修复 Avoided redundant navigation... 报错 ==================================
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function(route, onFulfilled, onRejected) {
    if (onFulfilled && onRejected) {
        originPush.call(this, route, onFulfilled, onRejected)
    }else {
        originPush.call(this, route, ()=>{}, ()=>{})
    }
}
VueRouter.prototype.replace = function(route, onFulfilled, onRejected) {
    if (onFulfilled && onRejected) {
        originReplace.call(this, route, onFulfilled, onRejected)
    }else {
        originReplace.call(this, route, ()=>{}, ()=>{})
    }
}
// ================================ 修复 Avoided redundant navigation... 报错 ==================================




Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        meta: {
            not_login_or_register: true, // 控制Footer组件在登录、注册时的隐藏
        },
        redirect: "/home",
    },
    {
        path: "/home",
        component: Home,
        name: "Home",
        meta: {
            not_login_or_register: true, // 控制Footer组件在登录、注册时的隐藏
        }
    },
    {
        path: "/login",
        component: Login,
        name: "Login",
        meta: {
            not_login_or_register: false, // 控制Footer组件在登录、注册时的隐藏
        }
    },
    {
        path: "/register",
        component: Register,
        name: "Register",
        meta: {
            not_login_or_register: false, // 控制Footer组件在登录、注册时的隐藏
        }
    },
    {
        path: "/search",
        component: Search,
        name: "Search",
        meta: {
            not_login_or_register: true, // 控制Footer组件在登录、注册时的隐藏
        }
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        name: "Detail",
        meta: {
            not_login_or_register: true, // 控制Footer组件在登录、注册时的隐藏
        }
    },
    {
        path: "/addcartsuccess/:skuid?/:skuNum?",
        component: AddCartSuccess,
        name: "AddCartSuccess",
        meta: {
            not_login_or_register: true, // 控制Footer组件在登录、注册时的隐藏
        }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        name: "ShopCart",
        meta: {
            not_login_or_register: true, // 控制Footer组件在登录、注册时的隐藏
        }
    },
    
];

const router = new VueRouter({
    routes,
    // 滚动行为: 当切换路由后自动将滚动条拉到最上面
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
});



// 添加全局路由前置守卫
router.beforeEach(
    async (to, from, next) => {
        const userName = Store.state.login_register.userInfo.name

        // 登录后不能再去注册和登录组件
        if (localStorage.getItem("TOKEN")) {
            if (to.path === "/login" || to.path === "/register") {
                // 重定向到首页
                next("/home")
            }else {
                // 是否成功获取到用户信息
                if (userName) {
                    // 已经成功获取到用户的信息
                    next()
                }else {
                    /* 
                        重新获取用户信息
                    */
                    try {
                        Store.dispatch("getUserInfo")
                        next()
                    } catch (error) {
                        // 对于登录了但是没有正确获取到用户信息时, 退出登录后再重新获取用户信息
                        await Store.dispatch("logout")
                        next("/login")
                    }
                }
            }
        }else {         // 未登录
            next()
        }
    }
)

export default router;

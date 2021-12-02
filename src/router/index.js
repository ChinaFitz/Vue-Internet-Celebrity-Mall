import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入路由组件
import Login from "@/views/Login"
import Register from "@/views/Register"
import Home from "@/views/Home"
import Search from "@/views/Search"



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
];

const router = new VueRouter({
    routes,
});

export default router;

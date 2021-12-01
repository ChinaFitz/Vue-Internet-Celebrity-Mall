import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from "@/views/Login"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        meta: {
            not_login_or_register: true, // 控制Footer组件在登录、注册时的隐藏
        }
    },
    {
        path: "/login",
        component: Login,
        name: Login,
        meta: {
            not_login_or_register: false, // 控制Footer组件在登录、注册时的隐藏
        }
    },
];

const router = new VueRouter({
    routes,
});

export default router;

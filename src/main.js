import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入elementUI作为二维码支付的UI
import { MessageBox, Pagination, } from "element-ui"
Vue.use(Pagination)

// 引入Vue图片懒加载插件
import VueLazyload from "vue-lazyload"
import load_png from "../public/lazy-load.png"
Vue.use(VueLazyload, {
    error: load_png,
    loading: load_png,
    attempt: 1
})



// ================= 表单验证插件 开始 =========================
import VeeValidate from "vee-validate";
// 中文提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);

//表单验证
VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
  },
  attributes: {
    phone: "手机号",
    code: "验证码",
    password: "密码",
    password1: "确认密码",
    agree:'用户协议'
  },
});

//自定义校验规则
VeeValidate.Validator.extend("agree", {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + "必须同意",
});
// ================= 表单验证插件 结束 =========================




Vue.config.productionTip = false


// 注册全局组件 -> 三级商品菜单
import TripleNav from "@/views/Home/TripleNav"
Vue.component(TripleNav.name, TripleNav)

// 注册全局组件 -> 轮播图(banner和floor)
import Carousel from "@/components/Carousel"
Vue.component(Carousel.name, Carousel)

// 注册全局组件 -> 分页器(Pagenation)
import Pagenation from "@/components/Pagenation"
Vue.component(Pagenation.name, Pagenation)

// 引入Mock让其自动执行一次, 模拟后台返回数据
import "@/mock/mockServe"

// 引入swiper的css
import "swiper/css/swiper.min.css"

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
  },
}).$mount('#app')

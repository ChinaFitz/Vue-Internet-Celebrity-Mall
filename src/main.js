import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入elementUI作为二维码支付的UI
import { MessageBox } from "element-ui"


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

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


// 注册全局组件 -> 三级商品菜单
import TripleNav from "@/views/Home/TripleNav"
Vue.component(TripleNav.name, TripleNav)

// 引入Mock让其自动执行一次, 模拟后台返回数据
import "@/mock/mockServe"

// 引入swiper的css
import "swiper/css/swiper.min.css"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

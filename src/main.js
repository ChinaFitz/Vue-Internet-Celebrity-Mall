import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


// 注册全局组件 -> 三级商品菜单
import TripleNav from "@/views/Home/TripleNav"
Vue.component(TripleNav.name, TripleNav)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

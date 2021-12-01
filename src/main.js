import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// ================================ 修复 Avoided redundant navigation... 报错 ==================================
const originPush = Vue.prototype.push
const originReplace = Vue.prototype.replace

Vue.prototype.push = function(route, onFulfilled, onRejected) {
    if (onFulfilled && onRejected) {
        originPush.call(this, route, onFulfilled, onRejected)
    }else {
        originPush.call(this, route, ()=>{}, ()=>{})
    }
}
Vue.prototype.replace = function(route, onFulfilled, onRejected) {
    if (onFulfilled && onRejected) {
        originReplace.call(this, route, onFulfilled, onRejected)
    }else {
        originReplace.call(this, route, ()=>{}, ()=>{})
    }
}
// ================================ 修复 Avoided redundant navigation... 报错 ==================================


// 注册全局组件 -> 三级商品菜单
import TripleNav from "@/views/Home/TripleNav"
Vue.component(TripleNav.name, TripleNav)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue';
import Vuex from 'vuex';

// Vuex模块
import home from './home';
import search from './search';
import detail from './detail';
import shopCart from './shopCart';
import login_register from './login_register';

Vue.use(Vuex);

export default new Vuex.Store({
    // 由于该项目所涉及到的模块较多, 为了避免糅合, 所有使用Vuex模块形式
    modules: {
        home,
        search,
        detail,
        shopCart,
        login_register,
    },
});

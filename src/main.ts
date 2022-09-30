import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//rem适配
import '@/base/rem.js'
//引入vantui
import Vant from 'vant';
import 'vant/lib/index.css';
//引入懒加载
import { Lazyload } from 'vant';
//监听pc端的 mouse 事件
import '@vant/touch-emulator';
//引入全局函数
import global from '@/base/global.js'
Vue.mixin(global)

Vue.use(Vant).use(Lazyload);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

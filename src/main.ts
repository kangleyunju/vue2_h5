import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/base/rem.js'//rem适配
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
import '@vant/touch-emulator';//监听pc端的 mouse 事件

Vue.use(Vant).use(Lazyload);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

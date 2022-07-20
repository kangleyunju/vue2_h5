import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/base/rem.js'
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant).use(Lazyload);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

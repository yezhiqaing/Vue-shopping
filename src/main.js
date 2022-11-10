import Vue from 'vue'
import App from './App.vue'
// 引入toast样式
import 'vant/es/toast/style';
import { Dialog } from 'vant';
Vue.use(Dialog)

Vue.config.productionTip = false
// 路由
import VueRouter from 'vue-router'
import router from './router'
// 全局css样式
import './assets/css/base.css'
// 设配
import './assets/js/rem'
import * as api from './request/api'
import store from '../src/store'
import utils from '../src/utils'
 Vue.prototype.utils=utils

Vue.filter('RMBFORMat',(val=>{
  return "￥"+Number(val).toFixed(2)+'元'
}))

Vue.use(VueRouter)
Vue.prototype.API = api





new Vue({
  render: h => h(App),
  beforeCreate(){
		Vue.prototype.$bus = this	//安装全局事件总线
	},
  router,
  store
}).$mount('#app')





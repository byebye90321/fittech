import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import CKEditor from '@ckeditor/ckeditor5-vue';
import request from './utils/request'// todo
Vue.use( CKEditor );
import './assets/fontawesome/css/all.css';

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
Vue.prototype.$http = request

Vue.prototype.webUrl = "https://demo.fastez.net"
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import Notifications from 'vue-notification'
Vue.use(Notifications)

const whiteList = ['/login','/snslogin'] // 路由白名单

router.beforeEach((to, from, next)=>{

  const isLogin = sessionStorage.getItem('token')
  if(isLogin){
    next()

  }else{
    if( whiteList.indexOf(to.path) !== -1){
      next()
    }else{
      next('/login')
    }
  }

})




new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})

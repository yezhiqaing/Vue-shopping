import Vue from'vue'
import Router from '../router'
import store from '../store';

export default {
    mustBelogin(){
      
        let token = localStorage.getItem("token");
        if (!token) {
         Vue.prototype.$toast("请先登录!");
         store.state.isGoBack.is=true
          setTimeout(() => {
            Router.push("/user");
          }, 500);
          return false
        }
        return true
    }
}
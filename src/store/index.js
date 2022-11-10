import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)
 import showshadow from '../store/showshadow'
 import isGoBack from '../store/isGoBack'
 import addres from '../store/addres'
export default new vuex.Store({
    modules:{
        showshadow,
        isGoBack,
        addres 
    }
       
})
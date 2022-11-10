import axios from 'axios'
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
const instance= axios.create({
    baseURL:'http://kumanxuan1.f3322.net:8001',
    timeout:5000
})

instance.interceptors.request.use(config=>{
    
    let token=localStorage.getItem('token')
    if(token){
        config.headers['X-Nideshop-Token'] =token
    }
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
    return config
})
instance.interceptors.response.use(res=>{
    Toast.clear();
    return res.data
    
})


export default instance
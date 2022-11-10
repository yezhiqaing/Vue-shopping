import axios from 'axios'
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
const request= axios.create({
    baseURL:'http://shop.bufantec.com/bufan',
    timeout:5000
})

request.interceptors.request.use(config=>{
    
    // let token=localStorage.getItem('token')
    // if(token){
    //     config.headers['X-Nideshop-Token'] =token
    // }
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
    return config
})
request.interceptors.response.use(res=>{
    Toast.clear();
    return res.data
    
})


export default request
<template>
 <div class="tabbox">
     <van-tabbar v-model="active"  active-color="red" inactive-color="#000">
  <van-tabbar-item to='/home' icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item to='/topic' icon="label-o">专题</van-tabbar-item>
  <van-tabbar-item to='/category' icon="apps-o">分类</van-tabbar-item>
  <van-tabbar-item to='/cart' icon="cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to='/user' icon="user-o">我的</van-tabbar-item>
</van-tabbar>
 </div>
</template>

<script>
export default {
data(){
    return{
  
    }
},

methods:{

},
computed:{
    active:{
 
         get(){
            return this.$route.meta.active
         },
         set(){},
       
    },
    
}
}
</script>

<style lang="less" scoped>
// .tabbox{
//     position: fixed;
//     bottom: 0;
//     width: 100%;
//     height: 1.33rem;
// }
</style>
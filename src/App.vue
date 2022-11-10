<template>
  <div class="app">
  <router-view></router-view>
  <Apptabbar v-if="$route.meta.isShowTabbar"/>
   </div>
</template>

<script>



 import Apptabbar from './components/search/Apptabbar.vue'
export default {
  components:{
    Apptabbar
  },
data(){
  
  return{
active:0
  }
},

methods:{

  
}
}
</script>

<style scoped>
  .app{
    height: 100%;
  }
</style>
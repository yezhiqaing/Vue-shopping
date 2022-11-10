<template>
  <div>
    <van-list
  v-model="loading"
  :finished="finishe"
  finished-text="没有更多了"
 
>
  <van-cell @click="cellClick(item)" v-for="(item,index) in searchTipsListData" :key="index" :title="item" />
</van-list>
  </div>
</template>

<script>
export default {
  props:['searchTipsListData'],
data(){
  return{
    // list:['1'],
    loading:false,
    finishe:true
  }
},
methods:{
  cellClick(item){
     console.log(item);
     this.$emit('tagClick',item)
  }
}
}
</script>

<style>

</style>
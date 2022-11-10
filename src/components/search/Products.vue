<template>
  <div>
            <van-list
  v-model="loading"
  :finished="finished"

  :immediate-check="false"
  finished-text="没有更多了"
  @load="onLoad"
>
 <ul>
        
        <li @click="Toxiangq(item)" v-for="(item,index) in ProductDate" :key="index">
         
            <img width="100%"  :src="item.list_pic_url" alt="">
           
           <div class="van-ellipsis">{{item.name}}</div>
           <div class="price">{{item.retail_price | RMBFORMat}}</div>
        </li>
    </ul>

</van-list>
   
  </div>
</template>

<script>

export default {
    
data(){
    return{
     ProductDate:[],
      finished:false,
     loading:false,
    //  list:[],
    }
    
},
methods:{
  Toxiangq(item){
     this.$router.push(`/productDetail?id=${item.id}`)
    //  解决 跳转到当前所在路由的时候，不进行跳转的问题
      if(this.$route.path=="/productDetail"){
        //  刷新页面
         this.$router.go(0)
      }
  },
   onLoad(){
 
     this.$bus.$emit('word')
     this.loading=false
     if(this.ProductDate.length>0){
      this.finished=false
     }
    },
},
mounted(){
   this.$bus.$on('hello',(val)=>{
      this.ProductDate=val
     
   
  })
  
}
  
}
</script>

<style lang="less" scoped>
ul{
    display: flex;
    flex-wrap: wrap;
    padding:.1333rem;
    //  justify-content: space-around;
    justify-content: space-between;

    li {
      background-color: #fff;
       margin-bottom:.2667rem;
     
        width:49%;
        text-align: center;
        .price{
              color: rgb(139, 39, 39);
              padding: .2rem 0;
        }
    }
}
 
</style>
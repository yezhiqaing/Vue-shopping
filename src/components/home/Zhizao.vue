<template>
  <div class="Zhizao">
    <h4>{{brand.name}}</h4>
     <div class="image">
        <img :src="brand.app_list_pic_url" alt="">
     </div>
     <div class="titel">
      {{brand.simple_desc}}
     </div>
  </div>

</template>

<script>
export default {
data(){
  return{
    brand:{}

  }
},
created(){
  this.getZhizao()
},
methods:{
 async getZhizao(){
   const res=await this.API.Getzhizao({params:{
      id:this.$route.query.id
     }})
     console.log(res);
     this.brand=res.data.brand
  }
}
}
</script>

<style lang="less" scoped>
  .Zhizao{
 
    background-color: #fff;
   h4{
    text-align: center;
    height: 1.07rem;
    line-height:  1.07rem;
    background-color: #fff;
   }
   .image{
    width: 100%;
    height: 5.33rem;
    img{
        width: 100%;
        height: 100%;
    }
   }
   .titel{
    margin-top: .27rem;
    font-size: .48rem;
    line-height: 40px;
   }
  }
</style>
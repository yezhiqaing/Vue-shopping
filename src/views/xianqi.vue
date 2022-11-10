<template>
  <div>

    <div class="image" v-html="res.content"></div>

      
  </div>
</template>

<script>
export default {
  data(){
    return{
     res:{}
    }
    },
    created(){
      this.getdata()
    },

  methods:{
   
  async  getdata(){
      let a=this.$route.query.id
       let res= await this.API.Getzhuan(a)
      this.res=res.data
    }
  }

}
</script>

<style lang="less" scoped>
.image{
  width: 100%;
  /deep/ img{
    width: 100%;
   }
}
</style>
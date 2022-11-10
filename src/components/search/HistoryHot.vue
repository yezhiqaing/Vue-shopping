<template>
  <div class="history-hot">
    <div v-if="isShowHistory" class="his-hot">
      <div class="hd">
        <h4>历史记录</h4>
        <van-icon @click="delClick" name="delete-o" />
      </div>
      <div class="bd">
<van-tag @click="tagClick(item)" v-for="(item,index) in historyKeywordList" :key="index" plain type="primary" text-color="#666">{{item}}</van-tag>


      </div>
    </div>

        <div class="his-hot">
      <div class="hd">
        <h4>热门搜索</h4>
      
      </div>
      <div class="bd">
<van-tag @click="tagClick(item)" v-for="(item,index) in hotKeywordList" :key="index" plain type="primary" text-color="#666">{{item.keyword}}</van-tag>


      </div>
    </div>
  </div>
</template>

<script>
export default {
  
  props:['historyKeywordList','hotKeywordList'],
  data(){
    return{
      isShowHistory:true
    }
  },
  methods:{
    tagClick(item){
  
      this.$emit('tagClick',item)
    },
    // 删除历史记录
  async  delClick(){
      const res= await this.API.ClearHistory()
       if(res.errno===0){
       setTimeout(()=>{
         this.isShowHistory=false
       },500)
        this.$toast('删除成功');
       }
    }
  }
}
</script>

<style lang="less" scoped>
.history-hot{
  .his-hot{
    background-color: #fff;
    padding:.1rem; 
    margin-bottom:.6667rem;
    .hd{
      display: flex;
      justify-content: space-between;
      h4{
        font-size: .24rem;   
      }
    }
  }
  .van-tag{
  margin-right: .1333rem;
    margin-top: .1333rem;  
    margin-bottom: .1333rem; 
    
  }
}
</style>
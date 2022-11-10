<template>
  <div>
    <div class="totiao">
          <div @click="$router.go(-1) " class="toleft">
            <van-icon name="arrow-left" />
            <span>返回</span>
          </div>
          <p>{{currentNav.name}}</p>
    </div>
    <van-tabs @click="getname" v-model="active">
      <van-tab
      v-for="item in navData"
        :key="item.id"
        :name="item.name"
        :title="item.name"
      >
           <div class="toptile">
        <h5>{{currentNav.name}}</h5>
         <p>{{currentNav.front_desc}}</p>
     </div>
        <van-grid v-if="list.length!==0" :border="false" :column-num="2">
          <van-grid-item  @click="ye(item.id)" v-for=" item in list" :key="item.id">
            <van-image :src="item.list_pic_url" />
            <p>{{item.name}}</p>
             <span class="price">{{item.retail_price|RMBFORMat}}</span>
          </van-grid-item>
        </van-grid>
         <div v-if="list.length==0" class="toxi">抱歉暂时没有没有数据</div>
      </van-tab>
    </van-tabs>


  </div>
</template>

<script>
export default {
  data() {
    return {
      //  选中的名字
      active: "",
      // 导航数据
      navData: [],
      // 商品数据
      list: [],
      // 介绍的数据
      currentNav:{}
    };
  },
  created() {
    this.getfendao();
  },
  methods: {
     ye(id) {
      this.$router.push(`/productDetail?id=${id}`);
      // console.log(id)
    },
    // 获取导航栏数据  和分类商品列表
    async getfendao() {
      const res = await this.API.category({
        params: { id: this.$route.query.id },
      });
   
      this.navData = res.navData;
      this.active = res.currentNav.name;
      //  商品的数据
      const list = await this.API.goodsList({
        params: { categoryId: this.$route.query.id },
      });
      console.log(list);
      this.list = list.data;
      this.currentNav=list.currentNav
    },
    // 参数是选中的名字
    async getname(val) {
    
      let id=this.navData.find(item=>item.name==val).id
       const list = await this.API.goodsList({
        params: { categoryId:id },
      });
      this.list = list.data;
      this.currentNav=list.currentNav
    },
  },
};
</script>

<style lang="less" scoped>
   .toptile{
    margin: .27rem 0 .08rem 0;
    height: 2.67rem;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h5{
        font-size: .43rem;
    }
    p{
        color: rgb(138, 132, 132);
        font-size: .35rem;
        margin-top: .27rem;
    }
   }

   .price{
    color: rgb(231, 49, 49);
    margin-top: .27rem;
   }
   .totiao{
    position: relative;
    height: 1.33rem;
    background-color:#fff;
    .toleft{
        height: 100%;
      display: flex;
      align-items: center;
      color: rgb(47, 160, 205);
      font-size: .4rem;
      
    }
    p{
       position: absolute;
       top: 50%;
       right: 50%;
       transform: translate(50%,-50%);

    }
   }
   .toxi{
  
    color: gray;
    font-size: .53rem;
    display: flex;
    justify-content: center;
     margin-top: 50%;
   }
</style>
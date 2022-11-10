<template>
  <div class="zhuantibox">
    <div @click="gotoxi(item.id)" class="zhuantitem" v-for="item in data" :key="item.id">
      <!-- 图片 -->
      <div class="pic">
        <img width="100%" :src="item.scene_pic_url" alt="" />
      </div>
      <!-- 内容 -->
      <div class="titelbox">
        <div class="title">{{item.title}}</div>
       <p>{{item.subtitle}}</p>
       <span>{{item.price_info|RMBFORMat}}</span>
      </div>
    </div>
    <!-- 分页器 -->
    <van-pagination
      v-model="page"
      :page-count="totalPages"
      mode="simple"
      @change="ChangeFn"
    />
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 2, //当前页
      pageSize: 10, // 每页的条数
      data: [], //数据
      totalPages: "2", //总页数
    };
  },
  created() {
    this.Getzhuay();
  },
  methods: {
gotoxi(id){
 this.$router.push(`/xianqi?id=${id}`)
},
    async Getzhuay() {
      const res = await this.API.Getzhuanti({
        params: {
          page: this.page,
          size: this.pageSize,
        },
      });
      console.log(res);
      let { currentPage, data, pageSize, totalPages } = res.data;
      this.page = currentPage; //当前页
      this.data = data; //数据
      this.totalPages = totalPages; //总页数
      this.pageSize = pageSize; // 每页的条数
    },
    ChangeFn(a) {
       this.page=a
       this.Getzhuay();
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-pagination__page-desc {
  display: none;
}
.zhuantibox{
  padding-bottom: 1.33rem;

  .zhuantitem {
    background-color: #fff;
   padding-bottom: .53rem;
  .pic {
    height: 5.33rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
 .titelbox{
  text-align: center;
 .title{
  font-size: .45rem;
  margin-top: .53rem;
 }
 p{
  color: rgb(82, 83, 85);
  line-height: 1.07rem;
 }
 span{
  color: rgb(211, 39, 39);
 }
 }
}
}

</style>













 
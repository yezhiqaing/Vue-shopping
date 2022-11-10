<template>
  <div class="home">
    <transition name="van-fade">
      <!-- 给首页内容套一个div用来控制显示和隐藏 -->
      <div v-if="$route.path === '/home'">
        <!-- 搜索栏 -->
        <van-search
          show-action
          shape="round"
          placeholder="请输入搜索关键词"
          @click="searchClick"
        />
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1989fa">
          <van-swipe-item v-for="item in banner" :key="item.id">
            <img :src="item.image_url" alt="" width="100%" />
          </van-swipe-item>
        </van-swipe>
        <!-- 导航区域 -->
        <Grid :channel="channel" />
        <!-- 制造商区域 -->
          <div class="Zhizou">
            <ul>
              <li @click="gotoZhizao(item.id)" v-for="item in brandList" :key="item.id">
                <img width="100%" :src="item.pic_url" alt="">
                 <div class="title">
                    <p>{{item.name}}</p>
                    <span>{{item.floor_price|RMBFORMat}}</span>
                 </div>
              </li>
            </ul>
          </div>
        <!-- 新品 -->
        <div class="Xinpi">
          <div class="topxin">
            <h2>---</h2>
            <p>周一周四新品首发</p>
            <h2>---</h2>
          </div>
          <div class="bootomxin">
            <Item :newGoodsList="newGoodsList" />
          </div>
        </div>
        <!-- 人气推荐 -->
        <div class="renpin">
          <div class="toprenqi">
            <p>人气推荐</p>
          </div>
          <div class="bottonrenpin">
            <van-card
              @click="gotdil(item.id)"
              v-for="item in hotGoodsList"
              :key="item.id"
              :price="item.retail_price.toFixed(2)"
              :desc="item.name"
              :title="item.goods_brief"
              :thumb="item.list_pic_url"
            />
          </div>
        </div>
          <!-- 专题精选 -->
        <Topic :topicList="topicList" />
          <!-- 居家 -->
      <div class="Jujia" v-for="item in categoryList" :key="item.id">
           <div class="topJujia">
              <h2>---</h2>
            <p>{{item.name}}</p>
            <h2>---</h2>
           </div>
           <Item :newGoodsList="item.goodsList"/>
      </div>
      </div>
       
    </transition>
    <!-- 黑色遮罩层 -->
    <transition name="van-fade">
      <div v-show="isok" class="popup-shadow"></div>
    </transition>
    <!-- 展示搜索弹出框 -->
    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Grid from "../components/home/Grid.vue";
import Topic from "../components/home/Topic.vue";
import Item from '../components/home/Item.vue'
export default {
  components: {
    Grid,
    Topic,
    Item,
  },

  data() {
    return {
      //  轮播图数据
      banner: [],
      // 导航栏数据
      channel: [],
      topicList: [],
      newGoodsList: [],
      hotGoodsList: [],
       brandList: [],
       categoryList:[],
    };
  },
  created() {
    this.GetHomebox();
  },

  computed: {
    // 调用仓库 拿到布尔值
    ...mapState("showshadow", { isok: "isShowShadow" }),
  },
  methods: {
    // 调用仓库  改变 显示遮罩层
    ...mapMutations("showshadow", ["shanIsShow"]),
    onSearch() {
      console.log("111");
    },
    onCancel() {
      console.log("eee");
    },
    // 首页所有数据
    async GetHomebox() {
      const res = await this.API.GetHomeData();
  
      console.log(res);
      let { banner, channel, topicList, newGoodsList, hotGoodsList,brandList,categoryList
 } = res.data;
      this.banner = banner;
      this.channel = channel;
      this.topicList = topicList;
      this.newGoodsList = newGoodsList;
      this.hotGoodsList = hotGoodsList;
      this.brandList=brandList
      this.categoryList=categoryList

    },
    // 点击搜索框跳转到搜索页面和开启首页遮罩层
    searchClick() {
      this.$router.push("/home/searchpopup");
      this.shanIsShow(true);
    },
    //  去往详情页
    gotdil(id) {
      this.$router.push(`/productDetail?id=${id}`);
    },
    gotoZhizao(id){
       this.$router.push(`/zhizao?id=${id}`);
    }
  },
};
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 1.33rem;
}
.popup-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.7);
}
.Xinpi {

  height: 13.87rem;
  background-color: #fff;
  .topxin {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-weight: 700;
      margin: 0 0.13rem;
    }
    h2 {
      color: rgb(151, 146, 146);
    }
  }
  .bootomxin {
    width: 100%;
    height: 100%;
    p {
      color: black;
      font-size: 0.4rem;
    }
    .price {
      color: rgb(216, 58, 58);
      margin-top: 0.13rem;
    }
  }
}
.renpin {
  .toprenqi {
    background-color: #fff;
    line-height: 1.33rem;
    text-align: center;
    height: 1.33rem;
    width: 100%;
    font-size: 0.53rem;
    color: black;
    font-weight: 550;
  }
  .bottonrenpin {
    background-color: #efefef;
    .van-card {
      background-color: #efefef;
    }
  }
}

.Zhizou {
  height:5.33rem;
  background-color: #fff;
 padding-bottom: 1.07rem;
  ul {
   
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      position: relative;
      width: 49%;
      height: 2.93rem;
      margin-bottom: 0.13rem;
      img{

        width: 100%;
        height: 100%;
      }
      .title{
        // width:4rem;
        position: absolute;
        top: 28%;
        left: 10%;
        display: flex;
        flex-direction: column;
       align-items: center;
         p{
          font-size: .4rem;
         }
        // z-index: 111;
        span{
          margin-top:.27rem ;
          color: rgb(233, 50, 50);
          font-weight: bold;
        }
      }
    }
  }
}
.Jujia{
  background-color: #fff;
  height:28rem;
  .topJujia{
    display: flex;
    justify-content: center;
     align-items: center;
       p {
      font-weight: 700;
      margin: 0 0.13rem;
    }
    h2 {
      color: rgb(151, 146, 146);
    }
  }
}

</style>
<template>
  <div >
     <div class="totiao">
          <div @click="$router.go(-1) " class="toleft">
            <van-icon name="arrow-left" />
            <span>返回</span>
          </div>
         <p>商品详情</p>
    </div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img width="100%" :src="item.img_url" alt="" />
      </van-swipe-item>
    </van-swipe>
    <van-row class="lei">
      <van-col style="text-align: center" span="8">
        <van-icon color="darkred" name="checked"></van-icon>
        30天无忧退货
      </van-col>
      <van-col span="8">
        <van-icon color="darkred" name="checked"></van-icon>
        48小时快递退费
      </van-col>
      <van-col span="8">
        <van-icon color="darkred" name="checked"></van-icon>
        满88元免邮费
      </van-col>
    </van-row>
    <!-- 商品信息 -->
    <div class="info">
      <h4>{{ name }}</h4>
      <p style="color: #565a5d" class="miao">{{ goods_brief }}</p>
      <div class="price">{{ retail_price | RMBFORMat }}</div>
    </div>
    <!-- 展示弹出层 -->
    <div class="danChu">
      <span>展示弹出层</span>
      <van-icon name="arrow" />
    </div>
    <div class="canshu">
      <p class="shangpc">商品参数</p>
      <ul>
        <li class="van-ellipsis" v-for="item in attribute" :key="item.id">
          <span style="flex: 1; text-align: center">{{ item.name }}:</span>
          <p style="flex: 2" class="van-ellipsis">{{ item.value }}</p>
        </li>
      </ul>
    </div>
    <!-- 产品图片 -->
    <div class="goods_descd" v-html="goods_desc"></div>
    <div class="inunfo">
      <div class="topbo">
        <p>-----</p>
        <h4 class="title">常见问题</h4>
        <p>-----</p>
      </div>
      <ul style="list-style-type: circle">
        <li v-for="item in issue" :key="item.id">
          <h4 class="biaoti">{{ item.question }}</h4>
          <p class="toptile">{{ item.answer }}</p>
        </li>
      </ul>
    </div>
    <!-- 相关产品 -->
    <div class="bottomxian">
      <div class="topbo">
        <p>-----</p>
        <h4 class="title">相关产品</h4>
        <p>-----</p>
      </div>
      <Products />
    </div>
    <!-- sku -->
    <van-sku
      ref="sku"
      v-model="show"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
    />
    <AppGoodsAction @cartdata="cartdata" @showSku="showSku" :goodsCount="goodsCount" />
  </div>
</template>

<script>
import Products from "../components/search/Products.vue";
import AppGoodsAction from "../components/search/AppGoodsAction.vue";
import { mapMutations } from "vuex";
//  import {mapState}from 'vuex'
export default {
  components: {
    Products,
    AppGoodsAction,
  },
  data() {
    return {
      cartshuju:[],
      show: false,
      sku: {
        tree: [],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        hide_stock: true, //是否显示商品剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "",
      },
      productId: 0,
      banner: [],
      // 名称名字
      name: "",
      // 商品价格
      retail_price: 0,
      // 商品描述
      goods_brief: "",
      goods_desc: "",
      issue: [],
      attribute: [],
      // 购物车数量
      goodsCount: 0,
    };
  },
  created() {
    // 请求详情页
    this.GetGoods();
    //  请求相关数据
    this.getRelated();
    this.getCarnum();
  },
  //  computed:{
  //   ...mapState('isGoBack',['is'])
  //  },
  methods: {
    ...mapMutations("addres", ["cartgo"]),
    // 点击加入购物车
    async showSku() {
      //  全局函数封装 会调用里面的东西和接收返回值
      let res = this.utils.mustBelogin();
      if (!res) return;

      // 如果sku是展示的，那么就是执行真正的加入购物车
     
      if (this.show) {
        const res = await this.API.addToCart({
          goodsId: this.$route.query.id,
          productId: this.productList,
          number: this.$refs.sku.getSkuData().selectedNum,
        });

        // 点击加入购物车 更新购物车数量
        this.goodsCount = res.data.cartTotal.goodsCount;
        // 提示加入成功
        this.$toast.success("加入成功");
      }
      this.show = !this.show;
    },
    cartdata(){
      let token=localStorage.getItem("token")
       if(token){
        this.cartgo(this.cartshuju)
      this.$router.push("/dingdan"); 
       }else{
         this.$toast("请先登录!");
            setTimeout(()=>{
                this.$router.push('/user')
            },1000)
       }
      
    },
    // 请求详情页消息
    async GetGoods() {
      const res = await this.API.GetGoodsDetail({
        params: { id: this.$route.query.id },
      });
   
      
      this.cartshuju=[{
        goods_name:res.data.info.name,
        goods_id:res.data.info.id,
        list_pic_url:res.data.info.list_pic_url,
            market_price:res.data.info.retail_price,
           number:1
      }]

      this.issue = res.data.issue;
      let { gallery, attribute, productList } = res.data;
      //  轮播图数据
      this.banner = gallery;
      // 商品规格信息
      this.attribute = attribute;
      this.productList = productList[0].id;
      //  商品信息详情
      let {
        goods_brief,
        name,
        retail_price,
        goods_desc,
        list_pic_url,
        goods_number,
      } = res.data.info;
      this.name = name;
      this.retail_price = retail_price;
      this.goods_brief = goods_brief;
      this.goods_desc = goods_desc;
      //  sku中商品的消息
      this.goods.picture = list_pic_url;
      this.sku.price = retail_price;
      this.sku.stock_num = goods_number;
    },
    // 请求相关产品
    async getRelated() {
      const res = await this.API.getGoodsRelted({
        params: { id: this.$route.query.id },
      });
    
      this.$bus.$emit("hello", res.data.goodsList);
    },
    //  购物车数量
    async getCarnum() {
      const res = await this.API.GetCartNum();
      this.goodsCount = res.data.cartTotal.goodsCount;
    },
  },
};
</script>

<style lang="less" scoped>
 
::v-deep.goods_descd {
  img {
    display: block;
    width: 100%;
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 0.2667rem;
  // line-height:.2667rem;
  height: 5.3333rem;
  text-align: center;
  background-color: #39a9ed;
}
.info {

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
 justify-content: center;
  // margin: auto;
  // padding-bottom: .27rem;

  background-color: #fff;
  height:2.6667rem;

  .price {
    color: rgb(185, 64, 64);
    font-size: .2267rem;
  }
  .miao {
   font-size: .2533rem;
   margin:.2667rem 0;
  }
}
.danChu {
  padding: 0.1333rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  span {
    font-size: 0.24rem;
  }
}
.inunfo {
  padding: 0.4rem;
  background-color: #fff;
  margin-top: 0 0.1333rem 0 0.2667rem;
  .topbo {
    display: flex;
    justify-content: center;
    .title {
      text-align: center;
      margin: 0 1.0667rem;
    }
  }
  .biaoti {
    margin-top: 0.1333rem;
  }
  .toptile {
    margin-top: 0.2667rem;
  }
}
.canshu {
  background-color: #fff;
  padding: 0 0.1333rem;
  padding-bottom: .53rem;
  margin-top: 0.4rem;
  ul {
    li {
      height: 0.6rem;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e8ecef;
    }
  }
  .shangpc {
    padding-top: 0.2667rem;
    
  }
}
.bottomxian {
  background-color: #fff;
  .topbo {
    display: flex;
    justify-content: center;
  }
}
.van-col {
  margin: 0.0667rem 0;
}
  .totiao{
    position: relative;
    height: 1.33rem;
    background-color: #fff;
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
</style>
<template>
  <div>
      <div class="totiao">
          <div @click="$router.go(-1) " class="toleft">
            <van-icon name="arrow-left" />
            <span>返回</span>
          </div>
         <p>我的订单</p>
    </div>
    <div class="bg"></div>
    <div @click="ha" v-if="carte == false" class="dizixin">
      <div class="infobox">请选择收货地址</div>
      <div class="icon">
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 地址 -->
    <div @click="Inits" class="Shou">
      <div class="headertitel">
        <span>{{ currentContact.address}}</span>
        <h3>{{ currentContact.address_detail}}</h3>
        <span>{{ currentContact.name}}{{ currentContact.tel}}</span>
      </div>
      <div class="icon">
        <van-icon name="arrow" />
      </div>
    </div>
   
    <div class="catd">
      <van-card
        v-for="item in cartList"
        :key="item.id"
        :num="item.number"
        :price="item.market_price.toFixed(2)"
        :title="item.goods_name"
        :thumb="item.list_pic_url"
        
      />
    </div>
    <!-- 配送日期 -->
    <div class="data">
      <div class="dataleft">
        <p>配送日期</p>
        <van-icon name="info-o" />
      </div>
      <div class="dataright">中小件预计{{ data }}送达</div>
    </div>
    <!-- 运费 -->
    <div class="yupric">
      <span>运费</span>
      <span>包邮</span>
    </div>
    <!-- 优惠券单元格 -->
    <van-coupon-cell
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
    />

    <Dipianji v-if="isok == true" />
    <!-- 优惠券列表 -->
    <van-popup
      v-model="showList"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px"
    >
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
    <div class="bottonprice">
      <div class="prititle">共{{ Num }}件，合计:{{ count||cartList[0].market_price}}元</div>
      <div class="gozhi">去付款</div>
    </div>
  </div>
</template>

<script>
import Dipianji from "../../views/Dipianji.vue";
import { mapState } from "vuex";
const coupon = [
  {
    available: 1,
    condition: "无使用门槛\n最多优惠12元",
    reason: "",
    value: 150,
    name: "优惠券名称",
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: "1.5",
    unitDesc: "元",
  },
  {
    available: 1,
    condition: "无使用门槛\n最多优惠12元",
    reason: "",
    value: 150,
    name: "优惠券名称",
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: "2",
    unitDesc: "元",
  },
];
 
export default {
  components: {
    Dipianji,
  },
  data() {
    return {
      chosenCoupon: -1,
      coupons: coupon,
      disabledCoupons: coupon,
      // 当前优惠券选中的价格
      youprice: 0,
      showList: false,
      // 商品数据
      cartList:[],
      // 判断地址是否隐藏
      isok: false,
      Dizlieb: [],
      // 地址数据
      currentContact:JSON.parse(localStorage.getItem("dares")),
      // .toFixed(2)
    };
  },
  created() {

    //  全局事件传来的商品数据
    this.$bus.$on("xinx", (a) => {
      this.isok = false;
      localStorage.setItem("dares", JSON.stringify(a));
      this.currentContact = JSON.parse(localStorage.getItem("dares"));
    });

    this.cartList = this.arr;
  },

  methods: {
    // 点击选择收货地址显示
    ha() {
      this.isok = true;
    },
    onEdit() {},
    // 点击 显示地址列表
    Inits() {
      this.isok = true;
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
      this.youprice = this.coupons[index].valueDesc;
    },
    onExchange(code) {
      console.log(code);
      this.coupons.push(coupon);
    },
  },
  computed: {
    ...mapState("addres", ["carte", "arr"]),
    // 日期
    data() {
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();
      let time = `${month}月${day + 1}日`;
      return time;
    },
    // 计算商品数量
    Num() {
      let num = this.cartList.reduce((prev, item) => {
        return prev + item.number;
      }, 0);
      return num;
    },
    count() {
      let price = this.cartList.reduce((prev, item) => {
        return prev + item.number * item.retail_price;
      }, 0);
      console.log(price);
      return price - this.youprice;
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  height: 1.07rem;
  line-height: 1.07rem;
  text-align: center;
  background-color: #fff;
}
.bg {
  height: 0.27rem;
  background-color: rgb(136, 145, 134);
}
.address {
  height: 2.4rem;
  line-height: 2.4rem;
  text-align: center;
  background-color: #fff;
}
.dizixin {
  display: flex;
  height: 2.67rem;
  background-color: #fff;
  .infobox {
    flex: 12;
    margin-top: 0.4rem;
    margin-left: 0.27rem;

    .title1 {
      font-size: 0.53rem;
    }
    .title2 {
      font-size: 0.53rem;
      margin-left: 0.27rem;
    }
    .dizilan {
      margin-top: 0.27rem;
    }
  }
  .icon {
    flex: 1;
    line-height: 2.67rem;
  }
}
.catd {
  margin-top: 0.27rem;
  background-color: #fff;
  .van-card {
    margin: 0;
  }
}
.Shou {
  padding: 0.27rem;
  height: 2.13rem;
  background-color: #fff;
  // margin-bottom: .27rem;
  display: flex;
  justify-content: space-between;
  .headertitel {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .icon {
    display: flex;
    align-items: center;
  }
}
.data {
  color: rgb(185, 189, 192);
  height: 0.8rem;
  background-color: rgb(244, 243, 243);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.27rem;
  .dataleft {
    display: flex;
    align-items: center;
    p {
      font-size: 0.27rem;
    }
    .van-icon {
      margin-top: 0.08rem;
    }
  }
  .dataright {
    font-size: 0.27rem;
  }
}
.yupric {
  display: flex;
  height: 30px;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.67rem 0 0.4rem;
}
.bottonprice {
  width: 100%;
  position: fixed;
  height: 1.33rem;
  line-height: 1.33rem;
  background-color: #fff;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
 .prititle{
  margin-left: .27rem;
 }
  .gozhi {
    margin-top: .13rem;
    margin-right: .27rem;
    width: 2.67rem;
    height: 1.07rem;
    line-height:  1.07rem;
    text-align: center;
    background-color: red;
    color: #fff;
  border-radius: 10px;
  }
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
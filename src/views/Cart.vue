<template>
  <div>
    <van-empty v-if="cartList == 0" description="购物车为空" />
    <div v-else class="carbox">
      <van-row>
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
      <!-- 产品列表 -->
      <van-checkbox-group v-model="result">
        <van-checkbox
          :disabled="isEditiing"
          :name="item.id"
          v-for="item in cartList"
          :key="item.id"
          @click="Xuanz(item)"
        >
          <van-swipe-cell>
            <van-card
              :price="item.retail_price.toFixed(2)"
              :num="item.number"
              :title="item.goods_name"
              :thumb="item.list_pic_url"
            />
            <van-stepper
              v-if="isEditiing"
              v-model="item.number"
              @change="chanNum(item)"
            />
            <template #right>
              <van-button
                @click="del(item)"
                class="delete-button"
                square
                type="danger"
                text="删除"
              />
            </template>
          </van-swipe-cell>
        </van-checkbox>
      </van-checkbox-group>
      <!-- 提交区域 -->
      <van-submit-bar
        :price="cartTotal.checkedGoodsAmount * 100"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <van-checkbox :disabled="cartList == 0" v-model="checkedall"
          >全选</van-checkbox
        >
        <template #tip>
          累计共43件商品，可以点击<van-button
            @click="isEditiing = !isEditiing"
            size="mini"
            :type="isEditiing ? 'danger' : 'primary'"
            >{{ isEditiing ? "完成编辑" : "编辑" }}</van-button
          >
          按钮进行商品数量的修改
        </template>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import store from "../store";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      result: [],

      // 购物车数据
      cartList: [],
      // 总数信息对象
      cartTotal: {},
      // 是否在线编辑状态
      isEditiing: false,
    };
  },
  created() {
    this.CarData();
  },
  methods: {
    //  购物车数据
    async CarData() {
      const res = await this.API.getCartData();
      this.renderData(res);
    },
    //  点击修改勾选状态
    async Xuanz(item) {
      if (this.isEditiing) return;
      const res = await this.API.getshuanx({
        isChecked: item.checked == 1 ? 0 : 1,
        productIds: item.product_id.toString(),
      });
      this.renderData(res);
      console.log(res);
    },
    renderData(res) {
      // 每次渲染数据之前都要清空数组
      this.result = [];
      this.cartList = res.data.cartList;
      this.cartTotal = res.data.cartTotal;
      res.data.cartList.forEach((item) => {
        item.checked === 1 ? this.result.push(item.id) : "";
      });
    },
    //  修改数量
    async chanNum(item) {
      const res = await this.API.stepNum({
        goodsId: item.goods_id,
        id: item.id,
        productId: item.product_id,
        number: item.number,
      });
      this.renderData(res);
    },
    // 删除操作
    async del(item) {
      const res = await this.API.DelGoods({
        productIds: item.product_id.toString(),
      });
      this.renderData(res);
    },
    // 去付款按钮
    onSubmit() {
      let a = this.cartList.every((itme) => {
        return itme.checked == 0;
      });
      if(a){
        this.$toast("请勾选需要结算的商品")
      }else{
         //  循环数组为选中状态的在通过全局事件传给订单页面（由于没有接口所以模仿）
      let carca = this.cartList.filter((item) => {
        if (item.checked == 1) {
          return item;
        }
      });
      this.cartgo(carca);
      this.$router.push("/dingdan"); 
      }
    },
    ...mapMutations("addres", ["cartgo"]),
  },
  computed: {
    checkedall: {
      get() {
        return (
          this.cartList.length === this.result.length &&
          this.cartList.length !== 0
        );
      },
      // 修改全选按钮
      async set(val) {
        let ids = this.cartList.map((item) => {
          return item.product_id;
        });
        const res = await this.API.getshuanx({
          isChecked: val == false ? 0 : 1,
          productIds: ids.join(),
        });
        this.renderData(res);
      },
    },
  },
  //  路由守卫
  beforeRouteEnter(to, from, next) {
    let token = localStorage.getItem("token");
    if (token) {
      next();
    } else {
      Vue.prototype.$toast("请先登录！");
      store.state.isGoBack.gocart = true;
      setTimeout(() => {
        next("/user");
      }, 500);
      return;
    }
  },
};
</script>

<style lang="less" scoped>
.carbox {
  width: 100%;
  height: 100%;
}
.van-checkbox-group {
  background-color: #fff;
  .van-checkbox {
    border-bottom: 1px solid #ccc;
  }
  ::v-deep.van-checkbox__label {
    flex: 1;
  }
}
.van-col {
  padding: 0.1333rem 0;
}
.van-submit-bar {
  bottom: 1.2rem;
  .van-submit-bar__tip {
    display: flex;
    align-items: center;
    .van-button {
      margin: 0 0.1333rem;
    }
  }
}

::v-deep.van-card__title {
  font-size: 0.32rem;
  padding-top: 0.0667rem;
}

.van-stepper {
  text-align: right;
}
.delete-button {
  height: 100%;
}
 .van-checkbox{
  border: 0 !important;
  padding: 0 .53rem;
  box-sizing: border-box;
}
</style>
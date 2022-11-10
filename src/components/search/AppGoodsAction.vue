<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-icon @click="gocar" icon="cart-o" text="购物车" :badge="goodsCount"/>
      <van-goods-action-button type="warning" @click="toAddCart" text="加入购物车" />
      <van-goods-action-button @click="dingclick" type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
    props:['goodsCount'],
  data() {
    return {};
  },
  methods:{
    toAddCart(){
       this.$emit('showSku')
       
    },
    dingclick(){
        this.$emit('cartdata')
    },
    gocar(){
      this.$router.push('/cart')
    }
  }
};
</script>

<style lang="less" scoped>
.van-goods-action{
  z-index: 9999;
}
</style>
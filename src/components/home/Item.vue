<template>
  <div class="item">
      <van-grid :column-num="2" :border="false">
              <van-grid-item
                @click="gotdil(item.id)"
                v-for="item in newGoodsList"
                :key="item.id"
              >
                <van-image :src="item.list_pic_url" />
                <p>{{ item.name }}</p>
                <span class="price">{{ item.retail_price | RMBFORMat }}</span>
              </van-grid-item>
            </van-grid>
  </div>
</template>

<script>
export default {
  props:['newGoodsList'],
  methods:{
     //  去往详情页
    gotdil(id) {
      this.$router.push(`/productDetail?id=${id}`);
    },
  }
}
</script>

<style lang="less" scoped>
// .item{
//     height: 10.67rem;
// }
</style>
<template>
  <div class="topic">
    <div class="title">专题精选</div>

    <van-swipe
      :loop="false"
      :height="220"
      :width="300"
      :show-indicators="false"
    >
      <van-swipe-item v-for="(item, index) in topicList" :key="index">
        <img width="100%" height="166px" :src="item.item_pic_url" alt="" />
        <div class="imgbotton">
          <div class="top">
            <div class="wentitle">{{ item.title }}</div>
            <span>{{ item.price_info | RMBFORMat }}起</span>
          </div>
          <div class="van-ellipsis">{{ item.subtitle }}</div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: ["topicList"],
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.topic {
  background-color: #fff;
  padding: 0.1333rem;
  .van-swipe-item:nth-child(2) {
    margin: 0 0.2667rem;
  }
  .title {
    text-align: center;
    font-size: 0.53rem;
    color: black;
    font-weight: 550;
    padding: 0.2667rem;
  }
  .imgbotton {
    .top {
      display: flex;
      span {
        color: rgb(139, 39, 39);
      }
    }
    .van-ellipsis {
      margin-top: 0.2rem;
      font-size: 0.2rem;
    }
  }
}
</style>
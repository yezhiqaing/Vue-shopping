<template>
  <div class="Fenlei">
    <!-- 搜索栏 -->
    <van-search
      show-action
      shape="round"
      placeholder="请输入搜索关键词"
      @click="searchClick"
    />
    <div class="fenbox">
      <!-- 左 -->
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          v-for="item in categoryList"
          :key="item.id"
          :title="item.name"
        />
      </van-sidebar>
      <!-- 右 -->
      <div class="rightFenl">
        <!-- 顶部图片 -->
        <div class="toppic">
          <img width="100%" :src="currentCategory.banner_url" alt="" />
        </div>
        <div class="Caritem">
          <div class="cartoptitel">
            <p>{{ currentCategory.name }}</p>
          </div>
          <!-- 底下的商品 -->
          <van-grid :border="false" :column-num="3">
            <van-grid-item
              @click="gotofenl(item.id)"
              v-for="item in currentCategory.subCategoryList"
              :key="item.id"
              :icon="item.wap_banner_url"
              :text="item.name"
            />
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
      //  左侧数据
      categoryList: [],
      // 右侧数据
      currentCategory: {},
    };
  },
  created() {
    this.getFenlei();
  },
  methods: {
    async getFenlei() {
      const res = await this.API.Getclassify();
      this.categoryList = res.data.categoryList;
      this.currentCategory = res.data.currentCategory;
     
      console.log("分类", res);
    },
    // 选中的索引，在通过索引拿到id发起右侧数据请求
    async onChange(index) {
      const res = await this.API.getFenleiitem({
        params: { id: this.categoryList[index].id },
      });
      console.log(res);
      this.currentCategory = res.data.currentCategory;
    },
    // 点击搜索框跳转到搜索页面和开启首页遮罩层
    searchClick() {
      this.$router.push("/home/searchpopup");
    },
    async gotofenl(id) {
      this.$router.push(`/fenleidaohan?id=${id}`);
    },
    
  },
};
</script>

<style lang="less" scoped>
.Fenlei {
  height: 100%;
  background-color: #fff;
  .fenbox {
    width: 100%;
    display: flex;
    .rightFenl {
      flex: 1;
      .toppic {
        flex: 1;
        width: 99%;
        height: 2.67rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.13rem;
        }
      }
      .Caritem {
        margin-top: 1.07rem;
        .cartoptitel {
          display: flex;
          justify-content: center;
          align-items: center;

          p {
            width: 3.2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            // font-weight: 700;
            font-size: 0.4rem;

            &::before {
              content: "";
              display: block;
              height: 0.08rem;
              width: 0.67rem;
              background: rgb(227, 223, 223);
            }
            &::after {
              content: "";
              display: block;
              height: 0.08rem;
              width: 0.67rem;
              background: rgb(227, 223, 223);
            }
          }
          h2 {
            color: rgb(151, 146, 146);
          }
        }
      }
    }
  }
}
</style>
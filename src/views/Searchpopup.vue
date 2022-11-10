<template>
  <div class="search-popup">
    <van-search
      v-model="ser"
      show-action
      :placeholder="placeVal"
      @search="onSearch"
      @cancel="onCancel"
      @input="onInput"
    />
    <HistoryHot
    @tagClick="tagClick"
      v-if="blockShow === 1"
      :historyKeywordList="historyKeywordList"
      :hotKeywordList="hotKeywordList"
    />
    <searchProductList
    @tagClick="tagClick"
      :searchTipsListData="searchTipsListData"
      v-else-if="blockShow === 2"
    />
    <SearchTipsList @PriceChange="PriceChange"  @categoryChange="categoryChange"  :prodata="prodata" v-else-if="blockShow === 3" />
    
  </div>
</template>

<script>
import HistoryHot from "../components/search/HistoryHot.vue";
import searchProductList from "../components/search/searchProductList.vue";
import SearchTipsList from "../components/search/SearchTipsList.vue";
import { mapMutations } from "vuex";
export default {
  components: {
    HistoryHot,
    searchProductList,
    SearchTipsList,
  },
  data() {
    return {
      // 文本框的值
     ser: "",
      // 搜索框中提示热词
      placeVal: "",
      // 历史记录数组
      historyKeywordList: [],
      // 热门搜索数组
      hotKeywordList: [],
      // 控制切换搜索页面对应界面
      blockShow: 1,
      // 搜索历史数据
      searchTipsListData: [],
      time: null,
      //  搜索的数据
      prodata: [],
        // 价格的排序
      order:'desc',
      categoryId:0,
      sort:0,
      size:10,
      page:1,
      resData:[]
    
    };
  },
  created() {
    this.getsearch();
  },
 mounted(){
  this.$bus.$on('word',this.onSearch)
 },
  methods: {
    // 组件传过来的id
    categoryChange(id){
     
      this.categoryId=id
      this.onSearch()
    
    },
    // 组件传过来的排序
    PriceChange(val){
     
      this.order=val
      this.sort='price'
       this.onSearch()
    },
    tagClick(item){
       this.blockShow=3
        this.onSearch(item)
    },
    ...mapMutations("showshadow", ["shanIsShow"]),
    // 按回车事件
    async onSearch(val) {
      this.blockShow = 3;
 
      // 发起请求搜索
      const res=await this.API.GetGoodsListData({keyword:val,categoryId:this.categoryId,order:this.order,sort:this.sort,size:this.size,page:this.page})
          // 改变数据
        res.data.filterCategory= res.data.filterCategory.map(item=>{
        return {text:item.name,value:item.id,checked:item.checked}
      })
      console.log(res);
      this.resData=[...this.resData,...res.data.data]
        //  赋值在props传子组件
       this.prodata= res.data.filterCategory
     
      this.$nextTick(function () {
        this.$bus.$emit("hello",this.resData);
      });
       
         this.page++   
         
    },
    onCancel() {
      this.$router.go(-1);
      this.shanIsShow(false);
    },
    // 历史记录 热门搜索 请求 
    async getsearch() {
      const res = await this.API.GetHishotData();
      let { defaultKeyword, historyKeywordList, hotKeywordList } = res.data;
      this.placeVal = defaultKeyword.keyword;
      this.hotKeywordList = hotKeywordList;
      this.historyKeywordList = historyKeywordList;
    },
    // 输入框输入触发
    onInput(val) {
      console.log(val);
      // 切换页面
      this.blockShow = 2;
      clearTimeout(this.time);
      this.time = setTimeout(async () => {
        // 发起搜索提示请求 
        const res = await this.API.GetSearchTipsData({
          params: { keyword: val} ,
        });
        this.searchTipsListData = res.data;
      }, 500);
    },
  },
};
</script>

<style>
.search-popup {
  position: absolute;
  z-index: 999;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #efefef;
 
}
</style>
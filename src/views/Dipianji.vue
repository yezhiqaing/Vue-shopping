<template>
  <div class="pianji">
    <van-address-list
      @select="Item"
      :switchable="true"
      v-model="chosenAddressId"
      :list="Dizlieb"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script> 

 export default {
  data() {
    return {
      a:{},
      Dizlieb: [
         
        {
          address: "广东省 广州市 越秀区",
          address_detail: "广东省 广州市 越秀区 儿童公园",
          name: "叶先生",
          tel: 13783678903,
          id: '0',
        },
         {
          address: "广东省 广州市 天河市",
          address_detail: "商业大厦",
          name: "小明",
          tel: 12345678901,
          id: '1',
        },
      ],
      chosenAddressId:localStorage.getItem("index"),
      list: [],
      disabledList: [
        {
          id: "0",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号",

        },
      ],
    };
  },

  created() {
   this.$bus.$on('ha',(a)=>{
      this.Dizlieb.push(a)
   })
  },

  methods: {
    // 点击新增地址时触发
    onAdd() {
      this.$router.push("/addXinx");
    },
    onEdit() {},
    // 切换选择地址时触发 
    Item(a, index) {
      // 储存触发时的索引
      localStorage.setItem("index", index); 
      this.chosenAddressId = index;
      //  控制选择收货地址的显示隐藏
      localStorage.setItem('addre','true')
       this.$bus.$emit('xinx',a)
      
      
    },
  },
};
</script>

<style lang="less" scoped>
.pianji {
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: #fff;
}
</style>
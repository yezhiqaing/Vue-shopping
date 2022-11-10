<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
  
export default {
  data() {
    return {
      areaList: areaList,
      searchResult: [],
    };
  },
  methods: { 
    onSave(a){
      this.$bus.$emit('ha',a)
      this.$router.push("/dingdan")
    },
    onDelete() {
      // Toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },

  },
};
</script>

<style>
</style>
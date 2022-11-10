<template>
  <div>
    <van-dropdown-menu
      >
      <van-dropdown-item
      
        title="综合"
        disabled
      />
      <van-dropdown-item v-model="value1" :options="option1" title="价格"  @change="priceChange"/>
      <van-dropdown-item v-model="value2" :options="prodata" title="分类" @change="categoryChange" />
    </van-dropdown-menu>
 
     <Products/>
  
     
  </div>
</template>

<script>
import Products from './Products.vue'
export default {
 props:['prodata'],

  components:{
   Products
  },
 beforeUpdate(){
 
this.prodata.map(item=>{
         if(item.checked){
          this.value2=item.value
         }
       })
 },


  data() {
    return {
     
      productsListData:[],
      value1: 'desc',
      value2: '',
      option1: [
        { text: "价格由高到低", value: 'desc'},
        { text: "价格由低到高", value: 'asc'},
      ],
      
    };
  },
  mounted(){
    this.$bus.$on('hello',(item)=>{
       this.productsListData=item
    })
  },
  methods:{
   
    // 点击选项导致 value 变化时触发
    categoryChange(val){
     this.$emit('categoryChange',val)
    },
    // 点击选项导致 value 变化时触发 
    priceChange(val){
      this.$emit('PriceChange',val)
    }
  }
};
</script>

<style>
</style>
<template>
  <div>
    <!-- 头像区域 -->
    <van-row @click="showLoginModal">
      <van-col class="left" span="6">
        <div class="imge">
          <img class="image" :src="avatar" alt="" />
        </div>
      </van-col>
      <van-col span="10">
        <span class="title">{{ nickname }}</span>
      </van-col>
      <van-col class="right" span="8">
        <van-icon @click="toShowLogoutModal" :name="icon" />
      </van-col>
    </van-row>
    <!-- 宫格区域 -->
    <van-grid :column-num="3">
      <van-grid-item v-for="item in girdata" :key="item.id" icon="photo-o" :text=item.title />
     
    </van-grid>
    <!--登录 弹出层 -->
    <van-popup style="width: 85%" v-model="show">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </van-popup>

  </div>
</template>

<script>
import "vant/es/dialog/style";
 import {mapState,mapMutations} from 'vuex'
export default {
  data() {
    return {
      username: "",
      password: "",
      // 用户名
      nickname: "点击登录",
      // 用户头像
      avatar: require("../assets/images/OIP-C.jpg"),
      // 登录框值
      show: false,
      icon: "arrow",
      // 退出登录框值
      showdialog: false,
      girdata:[
        {id:0,title:"我的订单"},
         {id:1,title:"优惠卷"},
          {id:2,title:"我的收藏"},
           {id:3,title:"地址管理"},
            {id:4,title:"联系客服"},
             {id:5,title:"帮助中心"},
              {id:6,title:"意见反馈"},
      ]
    };
  },
  
   

  created() {
    let token = localStorage.getItem("token")
    if (token) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.nickname = user.username;
      this.avatar = user.avatar;
      this.icon = "cross";
    }
  },
  computed:{
    ...mapState('isGoBack',['is']),
    ...mapState('isGoBack',['gocart'])

  },
  methods: {
    
     ...mapMutations('isGoBack',['shan']),
     ...mapMutations('isGoBack',['gotocart']),
    showLoginModal() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.show = !this.show;
      }
    },
    // 登录请求
    async onSubmit(val) {
    
      const res = await this.API.ToLogin({
        username: val["用户名"],
        pwd: val["密码"],
      });
      console.log(res);
      if (res.errno === 0) {
        this.$toast.success("登录成功!");
        localStorage.setItem("token", res.data.token);

        let { nickname, avatar } = res.data.userInfo;
        localStorage.setItem("user", JSON.stringify(res.data.userInfo));
        this.nickname = nickname;
        this.avatar = avatar;
        this.show = false;
        this.icon = "cross";         
          // 判断vuex里面的一个变量是否为true  返回上一页面 
        // if(this.is){
        //     this.$router.go(-1) 
        //    this.shan(false)
        // } else if(this.gocart){
        //      this.$router.push('/cart')
        //      this.gotocart(false)
        // }
        // this.$router.go (-1)
   
      // if(this.$route.path==="user"){
      //   this.$router.push('/user')
      // }else{
         this.$router.go (-1)
      // }
       
      }
      
    },
    // 退出
    async toShowLogoutModal() {
      let token = localStorage.getItem("token");
      if (token) {
        await this.$dialog
          .confirm({
            title: "退出登录框",
            message: "确认退出登录吗？",
          })
          .then(() => {
            this.$toast.success("退出登录成功!");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            this.nickname ='点击登录';
            this.avatar =  require("../assets/images/OIP-C.jpg");
            this.icon = "arrow";
          })
          .catch(() => {
           
          });
      }
    },
  },
 
 

};
</script>

<style lang="less" scoped>
.van-row {
  display: flex;
  align-items: center;
  height: 1.7333rem;
  background-color: rgb(35, 34, 37);
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    .image {
      width: 1.3333rem;  
      height: 1.3333rem;  
      border-radius: 50%;
    }
  }
  .title {
    color: #fff;
  }
  .right {
    padding-left: 2.4rem;   
    color: #fff;
  }
}
</style>
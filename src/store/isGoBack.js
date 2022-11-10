const state={
    //  控制添加到购物车没登录 跳转到登录返回添加购物车购物车
    is:false,
      //  控制购物车没登录 跳转到登录返回购物车
    gocart:false
}
const mutations={
    shan(state,val){
        state.is=val
    },
    gotocart(state,val){
        state.gocart=val
    }
}
const actions={}


export default{
    namespaced: true,
    state,
    mutations,
    actions
}
       
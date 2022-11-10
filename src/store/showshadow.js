const state={
    isShowShadow:false,
}
const mutations={
    shanIsShow(state,val){
        state.isShowShadow=val
    }
}
const actions={}


export default{
    namespaced: true,
    state,
    mutations,
    actions
}
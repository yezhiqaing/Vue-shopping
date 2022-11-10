
const state={
    carte:true,
    arr:JSON.parse(localStorage.getItem("info"))
}
const mutations={
    cartgo(state,val){
           state.arr=val
         localStorage.setItem("info",JSON.stringify(val))
        // console.log(val)
    }
}
const actions={
   
}


export default{
    namespaced:true,
    state,
    mutations,
    actions
}
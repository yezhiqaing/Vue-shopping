
import instance from './request'
import request from './request2'
//  首页数据
export const GetHomeData = () => instance.get('/index/index')

// 请求历史记录和热门搜索
export const GetHishotData = () => instance.get('/search/index')

// 搜索提示请求
export const GetSearchTipsData = (params) => instance.get('/search/helper', params)
// 请求搜索数据
export const GetGoodsListData = (data) => instance.get('/goods/list', { params: data })

// 请求清空历史记录
export const ClearHistory = () => instance.post('/search/clearhistory')
//   发起登录请求
export const ToLogin = (params) => instance.post('/auth/loginByWeb', params)

// 请求详情页
export const GetGoodsDetail = (params) => instance.get('/goods/detail', params)
// 请求相关产品数据
export const getGoodsRelted = (params) => instance.get('/goods/related', params)

//   发起购物车数量的请求
export const GetCartNum = () => instance.get('/cart/goodscount')

// 加入购物车
export const addToCart = (params) => instance.post('/cart/add', params)
// 请求购物车数据
export const getCartData = () => instance.get('/cart/index')

  // 切换商品选中状态（含全选）
  export const getshuanx=(params)=>instance.post('/cart/checked',params)

  // 修改数量
  export const stepNum=(params)=>instance.post('/cart/update',params)
  // 删除购物车功能
  export const DelGoods=(params)=>instance.post('/cart/delete',params)
//  请求制作商跳转页面
  export const Getzhizao=(params)=>instance.get('/brand/detail',params)
  //  专题页数据
  export const Getzhuanti=(params)=>instance.get('/topic/list',params)
  //  分类页数据
  export const Getclassify=()=>instance.get('/catalog/index')
  //  分类字项
  export const getFenleiitem=(params)=>instance.get('/catalog/current',params)
  // 获取收货地址列表
  export const Dizi=(params)=>instance.get('/address/save',params)
  // 20,240 2475
  // 获取分类中导航
  export const category=(params)=>request.get('/category/categoryNav',params)
  //  获取分类请求
  export const goodsList=(params)=>request.get('/goods/goodsList',params)
  //  获取地址列表
  export const GetDiz=()=>request.get('/address/getListAction',{params:{openId:1564}})
  export const Getzhuan=(id)=>request.get(`/topic/detailaction?id=${id}`)
  
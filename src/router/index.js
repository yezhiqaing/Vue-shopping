

import VueRouter from "vue-router";

import store from '../store'

const router = new VueRouter({
    routes: [
        {
            path: '/', redirect: '/home'
        },
        {
            path: "/home", component: () => import('../views/Home'),
            children: [
                {
                    path: '/home/searchpopup',
                    component: () => import('../views/Searchpopup')
                }
            ], meta: { active: 0, isShowTabbar: true },


        },
        {
            path: '/topic', component: () => import('../views/Topic'), meta: { active: 1, isShowTabbar: true },
             
        },
       
        {
            path: '/category', component: () => import('../views/Category'), meta: { active: 2, isShowTabbar: true }
        },
        {
            path: '/cart', component: () => import('../views/Cart'), meta: { active: 3, isShowTabbar: true }
        },
        {
            path: '/user', component: () => import('../views/User'), meta: { active: 4, isShowTabbar: true }
        },
        { path: '/productDetail', component: () => import('../views/ProductDetail'), meta: { isShowTabbar: false } },
        { path: '/zhizao', component: () => import('../components/home/Zhizao') },
        { path: '/dingdan', component: () => import('../components/cart/Dingdan') },
        { path: '/addXinx', component: () => import('../views/AddXinx') },
        { path: '/fenleidaohan', component: () => import('../views/Fenleidaohan') },
        {
            path:"/xianqi",
            component:()=>import("../views/xianqi")
        },
    ]
})


router.beforeEach((to, from, next) => {

    if (to.path == "/home") {
        store.state.showshadow.isShowShadow = false
    }
    next()
})


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

export default router
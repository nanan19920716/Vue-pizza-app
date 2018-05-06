import Vue from 'vue'
import App from './App.vue'
import { routes } from './router.js'
import { store } from './store/store.js'
import axios from 'axios'
axios.defaults.baseURL = 'https://wd5037821354auavpu.wilddogio.com/'
    // 1
import VueRouter from 'vue-router'
// 2
Vue.use(VueRouter)

Vue.prototype.http = axios
    //5 
const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        // return { x: 0, y: 100 }
        // return { selector: '.btn' }
        // if (savedPosition) {
        //     return savedPosition
        // } else {
        //     return { x: 0, y: 0 }
        // }
    }
})

// 路由钩子：全局守卫，组件内守卫，路由守卫

// 全局守卫
// router.beforeEach((to,from,next) =>{
//   // alert('还没有登录,请先登录!');
//   // next();
//   // console.log(to);
//   if(to.path =='/login' || to.path =='/register'){
//     next();
//   }else{
//     alert('还没有登录,请先登录!');
//     next('/login');
//   }
// })
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
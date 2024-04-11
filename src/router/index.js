import { createRouter,createWebHistory } from "vue-router";
import VueRouter from 'vue-router'

import home from '../pages/home/home.vue'
import login from '../pages/login/login.vue'
import news from '../pages/news/news.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/home',
            name:'home',
            component:home,
            meta:{
                show:true,
            }
        },
        {
            path:'/login',
            component:login,
            meta:{
                show:true,
            }
        },
        {
            path:'/news/:id',
            name: 'news',
            component:news,
            meta:{
                show:true,
            }
        },
        {
            path: '/',
            name:'login',
            component:login
        }
        // 重定向, 在项目跑起来的时候，访问/,立马让他定向到首页
        // {
        //     path:'/:pathMatch(.*)*',
        //     redirect:'/home'
        // }
    ]
})
// 路由守卫
// router.beforeEach((to, from, next) => {
//     if(to.path === '/main' && !isAuthenticated){
//         next('/login')
//     }else{
//         next()
//     }
// })

export default router;
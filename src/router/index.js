import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// Framework
// import Layout from '@/framework/Layout.vue'

// import postsRoutes from './posts';

// Page
// import Home from '@/views/Home.vue';
// import Page403 from '@/views/pages/Page403.vue';
// import Page404 from '@/views/pages/Page404.vue';
// import Page500 from '@/views/pages/Page500.vue';
// import Login from '@/views/pages/Login.vue';
// import Register from '@/views/pages/Register.vue';

// import Profile from '@/views/userProfile/Profile.vue';
// import ResetPassword from '@/views/userProfile/ResetPassword.vue';

// import PostsLayout from '@/views/posts/layout.vue';

function configRoutes() {
    return [
        {
            path: '/',
            redirect: '/index',
            name: 'index',
            component: () => import('@/framework/Layout.vue'),
            meta: {
                label: '管理首頁',
            },
            children: [
                {
                    path: 'index',
                    name: 'home',
                    meta: {
                        label: '首頁',
                        roles: ['*']
                    },
                    component: () => import('@/views/Home.vue'),
                },

            ]
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                pageTitle: '系統登入',
                roles: ['*']
            },
            component: () => import('@/views/pages/Login.vue'),
        },
        {
            path: '/order',
            name: '進度追蹤系統',
            component: () => import('@/framework/Layout.vue'),
            redirect: '/icons/coreui-icons',
            children: [
              {
                path: '/order/list',
                name: '訂單管理',
                meta: {
                    label: '訂單管理',
                    roles: ['*']
                },
                component: () => import('@/views/order/OrderList.vue'),
              },
              {
                path: '/own/lists',
                name: '自家開發管理',
                meta: {
                    label: '自家開發管理',
                    roles: ['*']
                },
                component: () => import('@/views/own/Lists.vue'),
              },
              {
                path: '/outsource/lists',
                name: '委外開發管理',
                meta: {
                    label: '委外開發管理',
                    roles: ['*']
                },
                component: () => import('@/views/outsource/Lists.vue'),
              },
              {
                path: '/completed/lists',
                name: '結束訂單',
                meta: {
                    label: '結束訂單',
                    roles: ['*']
                },
                component: () => import('@/views/completed/Lists.vue'),
              },
            //   {
            //     path: '/order/outsourcing',
            //     name: '委外開發管理',
            //     meta: {
            //         label: '委外開發管理',
            //         roles: ['*']
            //     },
            //     component: () => import('@/views/order/OutsourcingOrder.vue'),
            //   },
            ],
          },
        
        // postsRoutes,
        
        
        {
            path: '/500',
            name: 'page500',
            meta: {
                pageTitle: '伺服器錯誤',
                roles: ['*']
            },
            component: () => import('@/views/pages/Page500.vue'),
        },
        {
            path: '/page403',
            name: 'page403',
            meta: {
                pageTitle: '沒有權限',
                roles: ['*']
            },
            component: () => import('@/views/pages/Page403.vue'),
        },
        {
            path: '/page404',
            name: 'page404',
            meta: {
                pageTitle: '找不到頁面',
                roles: ['*']
            },
            component: () => import('@/views/pages/Page404.vue'),
        },
        {
            path: '*',
            name: 'page404',
            meta: {
                pageTitle: '找不到頁面',
                roles: ['*']
            },
            component: () => import('@/views/pages/Page404.vue'),
        },
    ]
}

export default new Router({
    //base: '/admin',
    base: '/admin',
    // mode: 'history', // https://router.vuejs.org/api/#mode
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
})

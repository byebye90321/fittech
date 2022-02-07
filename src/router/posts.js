// import Layout from '@/framework/Layout.vue'
// /**
//  * Pages
//  */
// import PostsLists from '@/views/posts/lists.vue';
// import PostsEdit from '@/views/posts/edit.vue';

export default {
    path: '/posts',
    name: 'posts',
    component: () => import('@/framework/Layout.vue'),
    redirect: '/',
    meta: {
        label: 'Posts',
    },
    children: [
        
        {
            path: '/posts/lists/:type',
            name: 'posts.lists',
            meta: {
                label: '列表',
                roles: ['*'],
                deleteAuth:true,
                post:'/posts'
            },
            component: () => import('@/views/posts/lists.vue'),
            props: true
        },
        {
            path: '/posts/create/:type',
            name: 'posts.create',
            meta: {
                label: '新增',
                roles: ['*']
            },
            component: () => import('@/views/posts/edit2.vue'),
            props: true
        },
     
    ]
}
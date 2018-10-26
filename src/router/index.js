import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const manage = r => require.ensure([], ()=> r(require('@/page/manage/manage')), 'manage');
const login = r => require.ensure([], () => r(require('@/page/base/login')), 'login');
const notFound = r => require.ensure([], () => r(require('@/page/base/404')), 'notFound');
const home = r => require.ensure([], () => r(require('@/page/manage/home/home')), 'home');
const user = r => require.ensure([], () => r(require('@/page/manage/system/user/user'), 'user'));
const system = r => require.ensure([], () => r(require('@/page/manage/system/system'), 'system'));
const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '*',
            name: 'notFound',
            component: notFound
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/manage',
            name: 'manage',
            component: manage,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: home,
                },
                {
                    path: '/system',
                    name: 'system',
                    component: system,
                    redirect: '/system/user',
                    children: [
                        {
                            path: 'user',
                            name: 'system-user',
                            component: user,
                        },
                    ]
                },
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    next();
})

export default router;
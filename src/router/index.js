import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/';
Vue.use(Router);

const manage = r => require.ensure([], ()=> r(require('@/page/manage/manage')), 'manage');
const login = r => require.ensure([], () => r(require('@/page/base/login')), 'login');
const notFound = r => require.ensure([], () => r(require('@/page/base/404')), 'notFound');
const home = r => require.ensure([], () => r(require('@/page/manage/home/home')), 'home');
const system = r => require.ensure([], () => r(require('@/page/manage/system/system'), 'system'));
const user = r => require.ensure([], () => r(require('@/page/manage/system/user/user'), 'user'));
const log = r => require.ensure([], () => r(require('@/page/manage/system/log/log'), 'log'));
const tool = r => require.ensure([], () => r(require('@/page/manage/tool/tool'), 'tool'));
const upload = r => require.ensure([], () => r(require('@/page/manage/tool/upload/upload'), 'upload'));
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
                    path: '/tool',
                    name: 'tool',
                    component: tool,
                    redirect: '/tool/upload',
                    children: [
                        {
                            path: '/tool/upload',
                            name: 'tool-upload',
                            component: upload,
                        },
                    ]
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
                        {
                            path: 'log',
                            name: 'system-log',
                            component: log,
                        },
                    ]
                },
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    if(window.sessionStorage.getItem('isLogin') === 'true') {
        next();
    }else if(to.path === '/login'){
        next();
    }else{
        next('/login');
    }
})

export default router;
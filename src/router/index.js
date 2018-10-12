import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const manage = r => require.ensure([], ()=> r(require('@/page/manage/manage')), 'manage');
const login = r => require.ensure([], () => r(require('@/page/base/login')), 'login');
const notFound = r => require.ensure([], () => r(require('@/page/base/404')), 'notFound');

const router = new Router({
    mode: 'history',
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
            component: manage
        }
    ]
})

router.beforeEach((to, from, next) => {
    next();
})

export default router;
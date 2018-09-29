import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const home = r => require.ensure([], ()=> r(require('@/components/sideNav')), 'home');
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
    ]
})

router.beforeEach((to, from, next) => {
    next();
})

export default router;
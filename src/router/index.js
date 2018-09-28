import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const home = r => require.ensure([], ()=> r(require('@/components/home')),'home');
const login = r => require.ensure([], () => r(require('@/components/login')), 'login');


const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
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
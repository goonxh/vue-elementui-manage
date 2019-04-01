import Vue from 'vue';
import Router from 'vue-router';
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
const markdown2html = r => require.ensure([],() => r(require('@/page/manage/tool/markdown2html/markdown2html.vue'),'markdown2html'));
const videoInCanvas = r => require.ensure([],() => r(require('@/page/manage/tool/videoInCanvas/videoInCanvas.vue'),'videoInCanvas'));
const easyDrag = r => require.ensure([],() => r(require('@/page/manage/tool/easyDrag/easyDrag.vue'), 'easyDrag'));
const record = r => require.ensure([], ()=> r(require('@/page/manage/tool/record/record.vue'), 'record'));
const screenRecord = r => require.ensure([], ()=> r(require('@/page/manage/tool/screenRecord/screenRecord.vue'), 'screenRecord'));
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
                        {
                            path: '/tool/markdown2html',
                            name: 'tool-markdown2html',
                            component: markdown2html,
                        },
                        {
                            path: '/tool/videoInCanvas',
                            name: 'tool-videoInCanvas',
                            component: videoInCanvas,
                        },
                        {
                            path: '/tool/drag',
                            name: 'tool-drag',
                            component: easyDrag,
                        },
                        {
                            path: '/tool/record',
                            name: 'tool-record',
                            component: record,
                        },
                        {
                            path: '/tool/screenRecord',
                            name: 'tool-screenRecord',
                            component: screenRecord,
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

import Vue from 'vue';
import Router from 'vue-router';

const home = {
    template: '<div>hello world</div>'
}
const gg = {
    template: '<div>hello gg</div>'
}
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/gg',
            name: 'gg',
            component: gg
        }
    ]
})
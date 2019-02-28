import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElemnetUI from 'element-ui';
import './style/element-variables.scss';
import { directive } from 'namedavatar/src/vue';
import { Message } from 'element-ui';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css'; //样式文件
import vueEasyDrag from 'vue-easy-drag';

Vue.use(ElemnetUI);
Vue.use(VueAxios,axios);
Vue.component('vue-easy-drag', vueEasyDrag);
Vue.config.productionTip = false;

// register as directive
Vue.directive('avatar',directive);

// 自定义highlightCode方法，将只执行一次的逻辑去掉
hljs.highlightCode = function () {
    let blocks = document.querySelectorAll('pre code');
    [].forEach.call(blocks, hljs.highlightBlock);
};

// axios请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers.authorization = window.sessionStorage.getItem('token');
    return config;
})

// axios响应拦截器
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // 对响应错误做点什么
    if(error.response.status === 401) {
        Message({
            type: 'error',
            message: '登录超时，正在跳转...',
            duration: 2000,
        })
        setTimeout(() =>{
            router.replace('/login');
            window.sessionStorage.removeItem('token');
        },1000)
    }
    return Promise.reject(error);
});

new Vue({
    el: "#app",
    router,
    store,
    components: {App},
    template: '<App/>',
})

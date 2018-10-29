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
Vue.use(ElemnetUI);
Vue.use(VueAxios,axios);
Vue.config.productionTip = false;

// register as directive
Vue.directive('avatar',directive);


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
    console.log(error.response)
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

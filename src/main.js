import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElemnetUI from 'element-ui';
import './style/element-variables.scss';

Vue.use(ElemnetUI);
Vue.use(VueAxios,axios);
Vue.config.productionTip = false

new Vue({
    el: "#app",
    router,
    components: {App},
    template: '<App/>'
})

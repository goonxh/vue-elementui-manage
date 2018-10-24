import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElemnetUI from 'element-ui';
import './style/element-variables.scss';
import { directive } from 'namedavatar/src/vue';

Vue.use(ElemnetUI);
Vue.use(VueAxios,axios);
Vue.config.productionTip = false;

// register as directive
Vue.directive('avatar',directive);

new Vue({
    el: "#app",
    router,
    components: {App},
    template: '<App/>'
})

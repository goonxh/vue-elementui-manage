import headTop from '@/components/headTop';
import sideNav from '@/components/sideNav';
import {baseUrl} from "../../config/utils";

export default {
    components: {
        headTop,
        sideNav
    },
    data() {
        return {
            isCollapse: false,
        }
    },
    created() {
      this.user();
    },
    methods: {
        clickMenuIcon(val) {
            this.isCollapse = val;
        },
        user() {
            this.axios.post(`${baseUrl}/userInfo`,{id: window.sessionStorage.getItem('userId')})
                .then((res) => {
                    this.$store.commit('setUser', res.data);
                }).catch((err) =>{
                    console.log(err);
            })
        },
    }
}
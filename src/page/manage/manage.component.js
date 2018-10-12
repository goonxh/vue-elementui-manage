import headTop from '@/components/headTop';
import sideNav from '@/components/sideNav';

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

    methods: {
        clickMenuIcon(val) {
            this.isCollapse = val;
        }
    }
}
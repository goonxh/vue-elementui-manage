<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import VueRouter from 'vue-router';
    const home = {
        template: '<div>hello world</div>'
    }
    const gg = {
        template: '<div>hello gg</div>'
    }
    const routes = [
        { path: '/', component: home },
        { path: '/gg', component: gg }
    ]
    const router = new VueRouter({
        routes // (缩写) 相当于 routes: routes
    })
    export default {
        name: "App.vue"
    }
</script>

<style scoped>

</style>
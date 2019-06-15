<template>
    <div id="app">
        <p @click='lock()'>Click me</p>
    </div>
</template>

<script>
export default {
    data() {
        return  {

        }
    },
    created() {
    },
    methods: {
        lock() {
            this.$screenLock('lock', {
                firstLock: window.sessionStorage.getItem('PASSWORD')?false:true,
            });
        }
    }
}
</script>

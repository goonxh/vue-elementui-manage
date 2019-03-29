<template>
    <div class="drag-page fill-contain">
        <vue-easy-drag :w="50" :h="50" :t="50" :l="50" :z="1" onselectstart="return false;" class="flex justify-content-center align-items-center">
            <p>drag me #1</p>
        </vue-easy-drag>
    </div>
</template>

<script>
    import vueEasyDrag from 'vue-easy-drag';

    export default {
        name: "easyDrag",
        components: {
            vueEasyDrag,
        }
    }
</script>

<style scoped lang="scss">
    .drag-page {
        position: relative;

        .dragBox {
            box-shadow: 2px 1px 1px 1px #ccc;
            background: #dddddd;
        }
    }
</style>

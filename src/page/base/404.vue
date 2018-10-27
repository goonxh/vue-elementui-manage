<template>
    <div class="notFound-page">
        <p class="not-found">404 NOT FOUND</p>
        <p class="back" @click="back">返回</p>
    </div>
</template>

<script>
    export default {
        methods:{
            back() {
                history.back(-1);
            }
        }
    }
</script>

<style scoped>
    .notFound-page{
        padding-top: 15%;
    }
    .not-found{
        text-align: center;
        font-size: 36px;
        font-style: oblique;
    }
    .back{
        text-align: center;
        font-size: 16px;
        text-decoration: underline;
        margin-top: 15px;
        font-style: oblique;
        cursor: pointer;
        color: #359EE8;
    }
</style>
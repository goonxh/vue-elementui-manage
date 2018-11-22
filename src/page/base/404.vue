<template>
    <div class="notfound-page">
        <div class="notFound">
            <img src="../../assets/img/404.png" class="notFoundPic">
            <p>抱歉，你访问的页面已丢失，请联系管理员。</p>
            <p><span v-on:click = "refresh()"><i class="el-icon-refresh"></i> 刷新</span><span v-on:click = "back()"><i class="el-icon-back"></i> 返回</span></p>
        </div>
    </div>
</template>

<script>
    export default {
        create() {
        },
        data() {
            return {};
        },
        methods: {
            refresh(){   //刷新本页
                window.location.reload();
            },
            back(){  //返回上一页
                window.history.go(-1);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .notfound-page{
        width: 100%;
        height: 100%;
        background-color: rgb(251,251,251);
        padding: 20% auto;
    }
    .notFound{
        width: 100%;
        padding-top: 150px;
        text-align: center;
    }
    p{
        line-height: 64px;
        color: #949494;
    }
    p span{
        margin: 0 50px;
        cursor: pointer;
        &:hover{
            color: rgba(53,158,232,.8);
        }
    }

</style>

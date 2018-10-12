<template>
    <div class="head-top">
        <el-row type="flex" justify="space-between">
            <div class="flex align-items-center head-left">
                <p>Vue+elementUI后台管理模板</p>
                <i class="el-icon-menu menu-icon" @click="changeMenuStatus"></i>
            </div>
            <div class="flex align-items-center head-right"><p>Admin</p></div>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                menuStatus: false,
            }
        },
        methods: {
            changeMenuStatus() {
                this.menuStatus = !this.menuStatus;
                this.$emit('clickMenuIcon',this.menuStatus);
            },
        }
    }
</script>

<style scoped lang="scss">
    .head-left, .head-right {
        height: 40px;
    }
    .head-left {
        color: #F5F5F5;
    }
    .menu-icon {
        margin-left: 15px;
        font-size: 18px;
        cursor: pointer;
    }
</style>
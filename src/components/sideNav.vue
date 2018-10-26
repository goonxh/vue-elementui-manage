<template>
    <div class="side-nav">
        <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :collapse="isCollapse"
                background-color="#32323A"
                text-color="#fff"
                active-text-color="#359EE8"
                router>
            <el-menu-item index="/home">
                <i class="iconfont icon-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="iconfont icon-setting"></i>
                    <span>系统管理</span>
                </template>
                    <el-menu-item index="/system/user">用户管理</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: ['isCollapse'],
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../style/variables";
    .side-nav {
        height: 100%;
        .el-menu {
            background-color: #333333;
            height: 100%;
            .el-menu-item {
                background-color: #333333;
            }
        }
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 200px;
            /*min-height: 800px;*/
            height: 100%;
        }
        .el-menu--collapse {
            height: 100%;
        }
    }

</style>
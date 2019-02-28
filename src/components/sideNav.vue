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
                <span slot="title">home</span>
            </el-menu-item>
            <el-submenu index="/tool">
                <template slot="title">
                    <i class="iconfont icon-wrench"></i>
                    <span>tools</span>
                </template>
                <el-menu-item index="/tool/upload">imageUpload</el-menu-item>
                <el-menu-item index="/tool/markdown2html">markdown2html</el-menu-item>
                <el-menu-item index="/tool/videoInCanvas">videoInCanvas</el-menu-item>
                <el-menu-item index="/tool/drag">easyDrag</el-menu-item>
            </el-submenu>
            <el-submenu index="/system">
                <template slot="title">
                    <i class="iconfont icon-setting"></i>
                    <span>system</span>
                </template>
                    <el-menu-item index="/system/user">user</el-menu-item>
                    <el-menu-item index="/system/log">log</el-menu-item>
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
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
               // console.log(key, keyPath);
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

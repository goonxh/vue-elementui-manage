<template>
    <div class="head-top">
        <el-row type="flex" justify="space-between">
            <div class="flex align-items-center head-left">
                <p>Vue+elementUI后台管理模板</p>
                <i class="iconfont icon-menu menu-icon"  @click="changeMenuStatus"></i>
            </div>
            <div class="flex align-items-center head-right">
                <img v-avatar="username" width="32" class="avator"/>
                <el-dropdown>
                     <span class="el-dropdown-link">
                      {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                     </span>
                     <el-dropdown-menu slot="dropdown">
                         <el-dropdown-item>锁定屏幕</el-dropdown-item>
                         <el-dropdown-item>账号管理</el-dropdown-item>
                         <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                     </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                menuStatus: false,
                username: '崔小虎'
            }
        },
        watch: {

        },
        methods: {
            changeMenuStatus() {
                this.menuStatus = !this.menuStatus;
                this.$emit('clickMenuIcon',this.menuStatus);
            },
            logout() {
                this.$router.replace('/login');
            }
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
        margin-top: 1px;
        cursor: pointer;
    }
    .el-dropdown-link{
        font-size: 14px;
        color: #333333;
    }
    .avator {
        border-radius: 50%;
        margin-right: 8px;
    }
</style>
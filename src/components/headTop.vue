<template>
    <div class="head-top">
        <el-row type="flex" justify="space-between">
            <div class="flex align-items-center head-left">
                <p>Vue+elementUI后台管理模板</p>
                <i class="iconfont icon-menu menu-icon"  @click="changeMenuStatus"></i>
            </div>
            <div class="flex align-items-center head-right">
                <img v-avatar="user.name" width="32" class="avator"/>
                <el-dropdown>
                     <span class="el-dropdown-link">
                      {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                     </span>
                     <el-dropdown-menu slot="dropdown">
                         <el-dropdown-item @click.native="lockScreen">锁定屏幕</el-dropdown-item>
                         <el-dropdown-item>账号管理</el-dropdown-item>
                         <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                     </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-row>
        <el-dialog
                title="屏幕已锁定，输入密码解锁"
                :visible.sync="lockScreenDialogVisible"
                class="lock-screen-dialog"
                width="400px"
                :close-on-click-modal ="closeDialog"
                :close-on-press-escape ="closeDialog"
                :show-close ="closeDialog"
        >
            <el-form :model="passForm"  ref="passForm" :rules="passFormRules">
                <el-form-item label="密码" label-width="55px" prop="password">
                    <el-input type="password" :readonly="readonly" @focus="removeReadonly" @blur="addReadonly" size="small" v-model="passForm.password" v-on:keyup.enter.native="submitPassForm"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitPassForm" size="small">解锁</el-button>
                <el-button type="primary" @click="logout" size="small">退出登录</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {baseUrl} from "../config/utils";

    export default {
        data() {
            return {
                lockScreenDialogVisible: false,
                closeDialog: false,
                menuStatus: false,
                readonly: true,
                passForm: {},
                passFormRules:{
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                }
            }
        },
        watch: {

        },
        computed: mapState(['user']),
        mounted(){
            this.lockScreenDialogVisible = window.sessionStorage.getItem('lockScreenDialogVisible') === 'true'?true:false;
        },
        methods: {
            changeMenuStatus() {
                this.menuStatus = !this.menuStatus;
                this.$emit('clickMenuIcon',this.menuStatus);
            },
            logout() {
                this.$router.replace('/login');
                window.sessionStorage.setItem('isLogin', 'false');
            },
            lockScreen() {
                this.lockScreenDialogVisible = true;
                window.sessionStorage.setItem('lockScreenDialogVisible','true');
            },
            submitPassForm() {
                this.$refs.passForm.validate((valid) => {
                    if (valid) {
                        let params ={
                            username:this.user.username,
                            password:this.passForm.password,
                        };
                        this.axios.post(`${baseUrl}/login`,params).then((res)=>{
                            if(res.data.success === 1) {
                                this.lockScreenDialogVisible = false;
                                window.sessionStorage.setItem('lockScreenDialogVisible','false');
                                this.$refs.passForm.resetFields();
                            }else{
                                this.$message.error(res.data);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            removeReadonly() {
                this.readonly = false;
            },
            addReadonly() {
                this.readonly = true;
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
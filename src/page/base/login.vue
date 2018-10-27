<template>
    <div class="login-page fill-contain flex justify-content-center">
        <div class="loginBox">
            <h3 class="system-name text-center">Vue+elementUI后台管理模板</h3>
            <el-form label-position="left" label-width="65px" :model="loginForm" ref="loginForm" :rules="loginRules" >
                <el-form-item label="用户名" prop="username" >
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" v-on:keyup.enter.native="login('loginForm')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login('loginForm')" plain>登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {baseUrl} from "../../config/utils";
    export default {
        data() {
            return {
                loginForm: {},
                loginRules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                },
            }
        },
        methods: {
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post(`${baseUrl}/login`,this.loginForm).then((res) =>{
                            if(res.data.success === 1) {
                                this.$router.replace('manage');
                                this.$store.commit('setUser', res.data.user);
                                window.sessionStorage.setItem('userId',res.data.user._id);
                                window.sessionStorage.setItem('userName',res.data.user.name);
                            } else {
                                this.$message.error(res.data);
                            }
                        }).catch((err)=>{

                        }).finally(()=>{

                        })
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    @import '../../style/variables';
    .login-page{
        background-color: rgb(251,251,251);
    }
    .loginBox{
        width: 450px;
        height: 280px;
        margin-top: 10%;
        background-color: rgb(255,255,255);
        border-radius: 10px;
        box-shadow:0 0 50px 0 rgba(0,0,0,0.04);
        .system-name{
            padding: 20px 0;
            color: #333333;
        }
        .el-form{
            width: 340px;
            margin: 10px auto;
            .el-form-item{
                text-align: left;
                .el-button{
                    width:100%;
                    margin: 5px auto;
                }
                .el-button:first-child{
                    margin-top: 15px;
                }
                .el-button:last-child{
                    margin-bottom: 30px;
                }
            }
        }
        .el-form-item__error{
            top:-30px;
            left: unset;
            right: 5px;
        }
        .el-form-item__label{
            padding: 0;
        }
        .el-input__inner{
            border-radius: 20px;
        }
    }
</style>
<template>
    <div class="fill-contain">
        <div>
            <el-button size="small" type="primary" @click="newUserDialog = true">新增用户</el-button>
        </div>
        <el-dialog title="新增用户" :visible.sync="newUserDialog" center width="400px" @close="closeUserForm">
            <el-form :model="newUserForm" label-width="80px" :rules="newUserFormRules" ref="userForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="newUserForm.username" size="small" clearable placeholder="用于登录"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="newUserForm.name" size="small" clearable placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="newUserForm.password" size="small" clearable type="password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="passwordAgain">
                    <el-input v-model="newUserForm.passwordAgain" size="small" clearable type="password" placeholder="重复密码"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="newUserForm.email" size="small" clearable placeholder="邮箱地址"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="newUserForm.role" size="small" clearable tplaceholder="角色" style="width: 100%">
                        <el-option label="管理员" value="管理员"></el-option>
                        <el-option label="普通用户" value="普通用户"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmBtn('userForm')" size="small">确定</el-button>
                <el-button @click="cancelBtn" size="small">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script src="./user.component.js"></script>
<style scoped lang="scss">
    .el-form-item {
        margin-bottom: 15px;
    }
</style>
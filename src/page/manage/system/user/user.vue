<template>
    <div class="fill-contain page-container">
        <div>
            <el-button size="small" type="primary" @click="newUserDialog = true">新增用户</el-button>
        </div>
        <el-table
                v-loading="loading"
                ref="userTable"
                :data="tableData"
                tooltip-effect="dark"
                @row-click="rowClick"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名"
                    align="center"
                    fixed>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    align="center"
                    fixed>
            </el-table-column>
            <el-table-column
                    prop="role"
                    label="角色"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱"
                    align="center">
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                    <div class="flex justify-content-center">
                        <el-button type="primary" @click="editUser(scope.row)" size="mini"> 修改</el-button>
                        <el-button type="danger" @click="deleteUser(scope.row._id, scope.row.name)" size="mini"> 删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="flex justify-content-center "
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-sizes="[10, 20, 30, 40]"
                       layout="sizes, prev, pager, next"
                       background
                       :page-size="pagination.pageSize"
                       :current-page="pagination.currentPage"
                       :total="pagination.total">
        </el-pagination>
        <el-dialog :title="dialogStatus === 'add'?'新增用户':'编辑用户'" :visible.sync="newUserDialog" center width="400px" @close="closeUserForm">
            <el-form :model="newUserForm" label-width="80px" :rules="newUserFormRules" ref="userForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="newUserForm.username" size="small" clearable placeholder="用于登录" :disabled="dialogStatus === 'edit'?true:false"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="newUserForm.name" size="small" clearable placeholder="姓名" :disabled="dialogStatus === 'edit'?true:false"></el-input>
                </el-form-item>
                <el-form-item label="原密码" prop="oldPassword" v-if="dialogStatus === 'edit'">
                    <el-input v-model="newUserForm.oldPassword" size="small" clearable type="password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item :label="dialogStatus === 'add'?'密码':'新密码'" prop="password">
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
    .el-table{
        margin-top: 15px;
    }
    .el-form-item {
        margin-bottom: 15px;
    }
    .el-pagination{
        margin-top: 15px;
    }
</style>
import {baseUrl} from "../../../../config/utils";

export default {
    data() {
        const validatePass = (rule, value, callback) => {  // 重复密码验证规则
            if (value) {
                if(value !== this.newUserForm.password) {
                    callback(new Error('两次输入的密码不同'));
                }else{
                    callback();
                }
            } else {
                callback(new Error('请重复输入密码'));
            }
        }
        return {
            newUserDialog: false,
            dialogStatus: 'add',
            newUserForm: {
                role:'',
            },
            tableData: [],
            loading: false,
            tablePageSize: 10,
            pagination: {},
            newUserFormRules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                ],
                name: [
                    {required: true, message: '请输入姓名', trigger: 'blur'},
                ],
                oldPassword: [
                    {required: true, message: '请输入原密码', trigger: 'blur'},
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                ],
                passwordAgain: [
                    {required: true, validator: validatePass, trigger: 'blur'},
                ]
            },
        }
    },
    created() {
      this.getUserList();
    },
    methods: {
        resetForm() {
            this.$refs['userForm'].resetFields();
            this.newUserForm = {role:'',};
            this.dialogStatus = 'add';
        },
        confirmBtn(formName) {
             this.$refs[formName].validate((valid) => {
                 if (valid) {
                     if(this.dialogStatus === 'add'){
                         this.axios.post(`${baseUrl}/register`, this.newUserForm).then((res)=>{
                             if(res.data === 1){
                                 this.$message.success('用户添加成功');
                                 this.newUserDialog = false;
                                 this.resetForm();
                                 this.getUserList();
                             }else{
                                 this.$message.error(res.data);
                             }
                         }).catch((err) => {
                             console.log(err);
                         }).finally(()=>{

                         })
                     }else{
                         this.axios.patch(`${baseUrl}/user`, this.newUserForm).then((res)=>{
                             if(res.data === 1){
                                 this.$message.success('用户信息修改成功');
                                 this.newUserDialog = false;
                                 this.resetForm();
                                 this.getUserList();
                             }else{
                                 this.$message.error(res.data);
                             }
                         }).catch((err) => {
                             console.log(err);
                         }).finally(()=>{

                         })
                     }
                 } else {
                     console.log('error submit!!');
                     return false;
                 }
             });
        },
        cancelBtn() {
            this.newUserDialog = false;
            this.resetForm();
        },
        closeUserForm() {
            this.resetForm();
        },
        getUserList({page = 1,pageSize = this.tablePageSize} = {
            page: 1,
            pageSize: this.tablePageSize
        }) {
            this.loading = true;
            this.axios.get(`${baseUrl}/user`,{params: {page:page,pageSize:pageSize}}).then((res) => {
                this.tableData = res.data.data;
                this.pagination = res.data.pagination;
            }).catch((err)=>{
                this.$message.error(err)
            }).finally(()=>{
                this.loading = false;
            })
        },
        rowClick() {

        },
        handleSelectionChange() {

        },
        handleCurrentChange(val) {
            this.getUserList({page:val, page_size:this.tablePageSize});
        },
        handleSizeChange(val) {
            this.tablePageSize = val;
            this.getUserList({page:1, page_size:this.tablePageSize});
        },
        editUser(row) {
            this.dialogStatus = 'edit';
            this.newUserDialog = true;
            this.newUserForm.name = row.name;
            this.newUserForm.username = row.username;
            this.newUserForm.role = row.role;
            this.newUserForm.email = row.email;
            this.newUserForm.id = row._id;
        },
        deleteUser(id,name) {
            this.$confirm(`确定要删除用户 ${name} 吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.delete(`${baseUrl}/user/${id}`).then((res) => {
                    this.$message.success('用户删除成功');
                    this.getUserList();
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
    }
}
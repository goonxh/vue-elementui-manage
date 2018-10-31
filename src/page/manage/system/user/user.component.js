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
            newUserForm: {},
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
        },
        confirmBtn(formName) {
             this.$refs[formName].validate((valid) => {
                 if (valid) {
                     this.axios.post(`${baseUrl}/register`, this.newUserForm).then((res)=>{
                         this.$message.success('用户添加成功');
                     }).catch((err) => {
                         console.log(err);
                     }).finally(()=>{
                         this.newUserDialog = false;
                         this.resetForm();
                     })
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
        editUser(id) {
            console.log(id)
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
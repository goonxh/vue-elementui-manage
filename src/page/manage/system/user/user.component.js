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
    }
}
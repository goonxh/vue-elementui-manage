(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{367:function(n,e,o){"use strict";o.d(e,"a",function(){return t});var t="";t=window.location.origin+"/api"},371:function(n,e,o){var t=o(386);"string"==typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);(0,o(18).default)("70600d22",t,!0,{})},385:function(n,e,o){"use strict";var t=o(371);o.n(t).a},386:function(n,e,o){(n.exports=o(17)(!1)).push([n.i,"\n.login-page[data-v-142a41e0] {\n  background-color: #fbfbfb;\n}\n.loginBox[data-v-142a41e0] {\n  width: 450px;\n  height: 280px;\n  margin-top: 10%;\n  background-color: white;\n  border-radius: 10px;\n  box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.04);\n}\n.loginBox .system-name[data-v-142a41e0] {\n    padding: 20px 0;\n    color: #333333;\n}\n.loginBox .el-form[data-v-142a41e0] {\n    width: 340px;\n    margin: 10px auto;\n}\n.loginBox .el-form .el-form-item[data-v-142a41e0] {\n      text-align: left;\n}\n.loginBox .el-form .el-form-item .el-button[data-v-142a41e0] {\n        width: 100%;\n        margin: 5px auto;\n}\n.loginBox .el-form .el-form-item .el-button[data-v-142a41e0]:first-child {\n        margin-top: 15px;\n}\n.loginBox .el-form .el-form-item .el-button[data-v-142a41e0]:last-child {\n        margin-bottom: 30px;\n}\n.loginBox .el-form-item__error[data-v-142a41e0] {\n    top: -30px;\n    left: unset;\n    right: 5px;\n}\n.loginBox .el-form-item__label[data-v-142a41e0] {\n    padding: 0;\n}\n.loginBox .el-input__inner[data-v-142a41e0] {\n    border-radius: 20px;\n}\n",""])},405:function(n,e,o){"use strict";o.r(e);var t=o(367),a={data:function(){return{loginForm:{},loginRules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},created:function(){this.$notify({title:"提示",message:"用户名、密码见调试模式。",duration:3e3}),console.log({username:"admin",password:"123456"})},methods:{login:function(n){var e=this;this.$refs[n].validate(function(n){if(!n)return!1;e.axios.post("".concat(t.a,"/login"),e.loginForm).then(function(n){1===n.data.success?(e.$store.commit("setUser",n.data.user),window.sessionStorage.setItem("isLogin","true"),window.sessionStorage.setItem("userId",n.data.user._id),window.sessionStorage.setItem("userName",n.data.user.name),window.sessionStorage.setItem("token","Bearer ".concat(n.data.token)),e.$router.replace("manage")):e.$message.error(n.data)}).catch(function(n){}).finally(function(){})})}}},i=(o(385),o(54)),r=Object(i.a)(a,function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",{staticClass:"login-page fill-contain flex justify-content-center"},[o("div",{staticClass:"loginBox"},[o("h3",{staticClass:"system-name text-center"},[e._v("Vue+elementUI后台管理模板")]),e._v(" "),o("el-form",{ref:"loginForm",attrs:{"label-position":"left","label-width":"70px",model:e.loginForm,rules:e.loginRules}},[o("el-form-item",{attrs:{label:"用户名",prop:"username"}},[o("el-input",{model:{value:e.loginForm.username,callback:function(n){e.$set(e.loginForm,"username",n)},expression:"loginForm.username"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"密码",prop:"password"}},[o("el-input",{attrs:{type:"password"},nativeOn:{keyup:function(n){if(!("button"in n)&&e._k(n.keyCode,"enter",13,n.key,"Enter"))return null;e.login("loginForm")}},model:{value:e.loginForm.password,callback:function(n){e.$set(e.loginForm,"password",n)},expression:"loginForm.password"}})],1),e._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary",plain:""},on:{click:function(n){e.login("loginForm")}}},[e._v("登录")])],1)],1)],1)])},[],!1,null,"142a41e0",null);r.options.__file="login.vue";e.default=r.exports}}]);
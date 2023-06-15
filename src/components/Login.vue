<template>
    <div class="login-box">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
            <h2>后台管理系统</h2>
            <el-form-item label="账号：" prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-btn" @click="submitForm(ruleFormRef)">登录
                </el-button>
                <el-button class="login-btn" @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form> 
    </div>
</template>
  
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import type { FormInstance, FormRules } from 'element-plus';
// import { login } from "@/request/api";
import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        interface LoginForm {
            username: string,
            password: string
        }
        class LoginData {
            ruleForm: LoginForm = {
                username: "",
                password: ""
            }
        }
        const data = reactive(new LoginData)
        const rules = {
            username: [
                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 3, max: 10, message: '账号的长度在3-10之间', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 10, message: '密码的长度在3-10之间', trigger: 'blur' },
            ],
        }
        const ruleFormRef = ref<FormInstance>()
        const router = useRouter()
        const submitForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate((valid: any) => {
                if (valid) {
                    // login(data.ruleForm).then((res: { data: { token: string; }; }) => {
                    //     //console.log(res)
                    //     //保存token
                    //     localStorage.setItem("token", res.data.token)
                    //     //跳转
                    //     router.push('/')
                    // })
                } else {
                    console.log('error submit!')
                    return false
                }
            })
        }
        //重置
        const resetForm = () => {
            data.ruleForm.username = "";
            data.ruleForm.password = "";
        }

        return {
            ...toRefs(data),
            rules,
            resetForm,
            ruleFormRef,
            submitForm
        }
    },
});
</script>
  
<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100%;
    background: url("../assets/login-bg.jpeg");
    text-align: center;
    padding: 1px;

    .demo-ruleForm {
        width: 500px;
        margin: 200px auto;
        background: #ffffff;
        padding: 40px;
        border-radius: 5px;
    }

    .login-btn {
        width: 48%;
    }

    h2 {
        margin-bottom: 20px;
    }
}
</style>
  
  
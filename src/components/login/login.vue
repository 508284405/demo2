<template>
    <div class="login-box">
        <el-form ref="formdataRef" :model="formdata" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
            <h2>登陆</h2>
            <el-form-item label="账号：" prop="username">
                <el-input v-model="formdata.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input v-model="formdata.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-btn" @click="submitForm(formdataRef)">登录
                </el-button>
                <el-button class="login-btn" @click="resetForm">重置</el-button>
            </el-form-item>
            <el-button type="primary" @click="gotoRegister()">去注册</el-button>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from 'element-plus';
import { login } from "../../api/login";
import { useRouter } from "vue-router";
import register from './register.vue'
const props = defineProps({
    who: {}
})
const formdata = reactive({
    username: '',
    password: ''
})

const formdataRef = ref()


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
            console.log(data.ruleForm)
            login(data.ruleForm).then((res) => {
                //保存token
                if (res.data.code == 0) {
                    console.log("登陆成功")
                    router.push('/')
                }
                console.log("登陆失败")
            })
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

//主动给父组件传值
const emit = defineEmits(['on-click'])

const gotoRegister = () => {
     emit('on-click','register')
}
</script>

<style lang="scss">
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
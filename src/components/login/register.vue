<template>
    <div class="login-box">
        <el-form ref="formRef" :model="formdata" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
            <header class="form-header">
                <span style="display: flex; align-items: flex-end;">
                    <h2 class="form-title">
                        注册
                    </h2>
                </span>
                <span class="pull-right">已有账号？<a href="/login">去登陆</a></span>
            </header>

            <el-form-item label="账号：" prop="username">
                <el-input v-model="formdata.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input v-model="formdata.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="验证码：" prop="verifycode" style="display: flex;">
                <el-input v-model="formdata.verifyCode" type="verifycode" autocomplete="off" style="width: 70%;" />
                <verifycode ref="verifycodeRef" @on-random="on_random" class="verifycode"></verifycode>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-btn" @click="submitForm(formdata)">注册</el-button>
                <el-button class="login-btn" @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from "vue";
import type { FormInstance, FormRules } from 'element-plus';
import { register } from "../../api/login/register";
import { useRouter } from "vue-router";
import verifycode from './verifycode.vue'
import Verifycode from "./verifycode.vue";

interface Formdata {
    username: String,
    password: String,
    verifyCode: String,
    clientId: Number
}

const formdata = reactive<Formdata>({
    username: "",
    password: "",
    verifyCode: "",
    clientId: 0,
})
const rules = {
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 10, message: '账号的长度在3-10之间', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 10, message: '密码的长度在3-10之间', trigger: 'blur' },
    ],
    verifyCode: [
        { required: true, message: '请输入验证码' },
        { min: 4, max: 4, message: '4位验证码' }
    ]
}
const on_random = (clientId: Number)=>{
    formdata.clientId = clientId
}

const router = useRouter()
const formRef = ref<FormInstance>()
const submitForm = (formdata: Formdata) => {
    console.log(formdata)
    //校验
    register(formdata).then((res: any) => {
        if (res.data.code == 0) {
            sessionStorage.setItem("token", res.data.data);
            // res.headers
            router.push('/redis')
        } else {
            verifycodeRef.value?.refreshCode()
            alert(res.data.message)
        }
    })
}
//校验表单数据
const formEl = (formdata: Formdata): Boolean => {
    return false
}

//重置
const resetForm = () => {
    formdata.username = "";
    formdata.password = "";
    formdata.verifyCode = ''
}

const  verifycodeRef = ref<InstanceType<typeof verifycode>>()

</script>

<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100%;
    // background: url("../assets/login-bg.jpeg");
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

.pull-right {
    float: right;
}

.form-title {
    display: flex;
    align-items: flex-end;
    font-size: 1.714rem;
    font-weight: bold;
}

.form-header {
    display: flex;
    align-items: flex-end; //元素置于父元素底部
    margin-bottom: 20px; //底部空余
    -webkit-box-pack: justify;
    justify-content: space-between; //子元素分隔
}

.verifycode {
    height: 32px;
    width: 101px;
    padding-left: 1px;
    padding-right: 1px;
}
</style>../../api/login/login
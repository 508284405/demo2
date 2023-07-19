<template>
    <div class="login-box">
        <el-form ref="formRef" :model="formdata" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
            <header class="form-header">
                <span style="display: flex; align-items: flex-end;">
                    <h2 class="form-title">
                        登陆
                    </h2>
                </span>
                <span class="pull-right">没有账号？<a href="/register">去注册</a></span>
            </header>

            <el-form-item label="账号：" prop="username">
                <el-input v-model="formdata.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input v-model="formdata.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-btn" @click="submitForm(formdata)">登录
                </el-button>
                <el-button class="login-btn" @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from "vue";
import type { FormInstance, FormRules } from 'element-plus';
import  login  from "../../api/login/login";
import { useRouter } from "vue-router";

interface Formdata {
    username: String,
    password: String
}

const formdata = reactive<Formdata>({
    username: "",
    password: ""
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
}
const router = useRouter()
const formRef = ref<FormInstance>()
const submitForm = (formdata: Formdata) => {
    //校验
    login(formdata).then((res) => {
        if (res.data.code == 0) {
            sessionStorage.setItem("token", res.data.data.authorization);
            sessionStorage.setItem("uid", res.data.data.id);
            // res.headers
            router.push('/redis')
        } else {
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
}
</script>

<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100%;
    // background-image: url("https://plus.unsplash.com/premium_photo-1675756583871-6be3905c4ef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80");
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
}</style>
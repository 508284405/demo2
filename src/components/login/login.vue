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
    background-image: url("https://wy-public-1306368414.cos.ap-nanjing.myqcloud.com/WechatIMG5%202.png?q-sign-algorithm=sha1&q-ak=AKIDrwbyNV7L80Ow9U8bUHcdpiDdLbhzeD1RYQWjOcNfq9aPPO6jDRvSzA7Ky3qO87Zs&q-sign-time=1690688489;1690692089&q-key-time=1690688489;1690692089&q-header-list=host&q-url-param-list=ci-process&q-signature=53aa250a0c17dacf6ad81615733e8f787ed01c9e&x-cos-security-token=h8Wo2fbvZgbUrO1kuwDS01LU9RYMsdra726bf9e9fd73de500d8347e214409fafR7XgGv-X3ofTM_SXyGupWhbz3dYLLWm7Etm8nPcTTM7q1qqKON7_5xQyTTkMjiaYdeCE_a9UM9zB0kEIT3C-5jXwXs1eFEWsW9L54H-DCE5J9xX2HWWVzPCRLEJEEwTIx_ECKg0Q_VpAYUoGoOL1UOTn4LytE0LeU9J7Th4jamaCWHzerSB7v8ykZrf82VGf&ci-process=originImage");
    background-repeat:round;
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
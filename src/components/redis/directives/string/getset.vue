<template>
    <div style="display: flex;">
        <span>示例：GETSET key value</span>
        <Tip :content="`以原子方式将键设置为值，并返回存储在键的旧值。当键存在但不保存字符串值时返回错误。与密钥关联的任何先前生存时间都将在成功执行 SET 操作后被丢弃`"
            style="margin-left: 10px;"></Tip>
    </div>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="key" prop="key">
            <el-input style="width: 150px;" v-model="ruleForm.key" type="value" autocomplete="off" />
        </el-form-item>

        <el-form-item label="value" prop="value">
            <el-input style="width: 150px;" v-model="ruleForm.value" type="value" autocomplete="off" />
        </el-form-item>

        <el-form-item label="sql" prop="sql">
            <el-input style="width: 150px;" v-model="ruleForm.sql" type="value" autocomplete="off" />
            <el-button type="primary" @click="generate(ruleFormRef)">Generate</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import Tip from '../../../tips/index.vue'

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
    key: '',
    value: '',
    sql: '',
})
const validateValue = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the value'))
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    key: [{ validator: validateValue, trigger: 'blur' }],
    value: [{ validator: validateValue, trigger: 'blur' }],
})
const generate = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            ruleForm.sql = `getset ${ruleForm.key} ${ruleForm.value}`
        } else {
            ruleForm.sql = 'error'
            return false
        }
    })
}

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
<style scoped></style>
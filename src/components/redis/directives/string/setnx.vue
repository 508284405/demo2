<template>
    <div style="display: flex;">
        <span>示例：setnx x x (deprecated)</span>
        <Tip :content="`如果键不存在，则设置键以保存字符串值。在这种情况下，它等于 SET。当键已保存值时，不执行任何操作。SETNX是“SET if Not eXists”的缩写。`" style="margin-left: 10px;"></Tip>
    </div>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" label-position="left"
        class="demo-ruleForm">
        <el-form-item label="key" prop="key">
            <el-input style="width: 150px;" v-model="ruleForm.key" type="key" autocomplete="off" />
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
    sql: ''
})
//set
const validateKey = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the key'))
    } else {
        callback()
    }
}
const validateValue = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the value'))
    } else {
        callback()
    }
}


const rules = reactive<FormRules>({
    key: [{ validator: validateKey, trigger: 'blur' }],
    value: [{ validator: validateValue, trigger: 'blur' }],
})
const generate = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            ruleForm.sql = `setnx ${ruleForm.key} ${ruleForm.value}`
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

const options = [
    {
        value: 'PX',
        label: '毫秒',
    },
    {
        value: 'EX',
        label: '秒',
    },
]
</script>
<style scoped></style>
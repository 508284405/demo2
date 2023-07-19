<template>
    <div style="display: flex;">
        <span>示例：GETDEL X</span>
        <Tip :content="`获取密钥的值并删除密钥。此命令类似于 GET，不同之处在于它还会在成功时删除键（当且仅当键的值类型为字符串时）`" :version="`6.2.0`"
            :time-complexity="`O(1)`" style="margin-left: 10px;"></Tip>
    </div>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
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
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import Tip from '../../../tips/index.vue'

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
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
    value: [{ validator: validateValue, trigger: 'blur' }],
})
const generate = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            ruleForm.sql = `GETDEL ${ruleForm.value}`
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
    // console.log(ruleForm.value)
}
</script>
<style scoped></style>
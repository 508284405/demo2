<template>
    <div style="display: flex;">
        <span>示例：GETRANGE key start end</span>
        <Tip :content="`返回存储在键的字符串值的子字符串，由偏移量开始和结束（两者都包含）确定。可以使用负偏移量来提供从字符串末尾开始的偏移量。所以 -1 表示最后一个字符，-2 表示倒数第二个字符，依此类推。
该函数通过将结果范围限制为字符串的实际长度来处理超出范围的请求。`" :version="`2.4.0`"
            :time-complexity="`O(N) 其中 N 是返回字符串的长度。复杂性最终由返回的长度决定，但由于从现有字符串创建子字符串非常便宜，因此对于小字符串，可以将其视为 O(1)`"
            style="margin-left: 10px;"></Tip>
    </div>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="value" prop="value">
            <el-input style="width: 150px;" v-model="ruleForm.value" type="value" autocomplete="off" />
        </el-form-item>
        <el-form-item label="start" prop="start">
            <el-input style="width: 150px;" v-model="ruleForm.start" type="value" autocomplete="off" />
        </el-form-item>
        <el-form-item label="end" prop="end">
            <el-input style="width: 150px;" v-model="ruleForm.end" type="value" autocomplete="off" />
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
    value: '',
    sql: '',
    start: null as unknown as Number,
    end: null as unknown as Number,
})
const validateValue = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the value'))
    } else {
        callback()
    }
}
const validateStart = (rule: any, value: any, callback: any) => {
    if (value === '' || isNaN(value)) {
        callback(new Error('Please input the value for number'))
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    value: [{ validator: validateValue, trigger: 'blur' }],
    start: [{ validator: validateStart, trigger: 'blur' }],
    end: [{ validator: validateStart, trigger: 'blur' }],
})
const generate = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            ruleForm.sql = `getrange ${ruleForm.value} ${ruleForm.start} ${ruleForm.end}`
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
<template>
    <div style="display: flex;">
        <span>示例：setrange key offset value </span>
        <Tip :version='`2.2.0`'
        :time-complexity="`O（1），不计算就地复制新字符串所花费的时间。通常，此字符串非常小，因此摊销复杂度为 O（1）。否则，复杂度为 O（M），M 是值参数的长度。`"
        :content="`覆盖存储在键中的部分字符串，从指定的偏移量开始，覆盖整个值长度。如果偏移量大于 at 键字符串的当前长度，则用零字节填充字符串以使偏移量适合。不存在的键被视为空字符串，因此此命令将确保它包含足够大的字符串，以便能够在偏移量处设置值。`" style="margin-left: 10px;"></Tip>
    </div>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" label-position="left"
        class="demo-ruleForm">
        <el-form-item label="key" prop="key">
            <el-input style="width: 150px;" v-model="ruleForm.key" type="key" autocomplete="off" />
        </el-form-item>
        <el-form-item label="offset" prop="offset">
            <el-input style="width: 150px;" v-model="ruleForm.offset" type="value" autocomplete="off" />
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
    offset: null as unknown as Number,
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
const validateOffset = (rule: any, value: any, callback: any) => {
    if (value === '' || isNaN(value)) {
        callback(new Error('Please input the offset for number'))
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
    offset: [{ validator: validateOffset, trigger: 'blur' }],
    value: [{ validator: validateValue, trigger: 'blur' }],
})
const generate = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            ruleForm.sql = `setrange ${ruleForm.key} ${ruleForm.offset} ${ruleForm.value}`
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
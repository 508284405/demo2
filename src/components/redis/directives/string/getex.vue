<template>
    <div style="display: flex;">
        <span>示例：GETEX x PX x</span>
        <Tip :content="`获取密钥的值，并选择性地设置其过期时间。GETEX 类似于 GET，但是一个带有附加选项的写入命令`" :version="`6.2.0`" :time-complexity="`O(1)`"
            style="margin-left: 10px;"></Tip>
    </div>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="value" prop="value">
            <el-input style="width: 150px;" v-model="ruleForm.value" type="value" autocomplete="off" />
        </el-form-item>
        <el-form-item label="过期时间" prop="expirationTime">
            <el-input style="width: 150px;" v-model="ruleForm.expirationTime" type="expirationTime" autocomplete="off" />
            <el-select v-model="ruleForm.unit" class="m-2" placeholder="Select" size="default" style="width: 100px;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
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
import type { FormInstance, FormRules, TabPaneName } from 'element-plus'
import Tip from '../../../tips/index.vue'
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
    value: '',
    sql: '',
    unit: 'PX',
    expirationTime: null as unknown as Number,
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
            ruleForm.sql = `getex ${ruleForm.value}`
            if(ruleForm.expirationTime){
                ruleForm.sql += `${ruleForm.unit} ${ruleForm.expirationTime}`
            }
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
    {
        value: 'EXAT',
        label: '指定秒后过期',
    },
    {
        value: 'PXAT',
        label: '指定毫秒后过期',
    },
    {
        value: 'PERSIST',
        label: '删除与密钥关联的生存时间',
    }
]
</script>
<style scoped></style>
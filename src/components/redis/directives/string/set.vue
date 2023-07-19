<template>
    <div>
        <h2>存储字符串</h2>
        <el-tabs type="border-card" style="height: 90%;">
            <el-tab-pane label="SET">
                <div style="display: flex;">
                    <span>示例：set x x</span>
                    <Tip :content="`设置 key 以保存字符串值。如果 key 已保存一个值，则无论其类型如何，都会覆盖该值。与密钥关联的任何先前生存时间都将在成功执行 SET 操作后被丢弃。`" style="margin-left: 10px;"></Tip>
                </div>
                <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                    label-position="left" class="demo-ruleForm">
                    <el-form-item label="key" prop="key">
                        <el-input style="width: 150px;" v-model="ruleForm.key" type="key" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="value" prop="value">
                        <el-input style="width: 150px;" v-model="ruleForm.value" type="value" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="expirationTime" prop="expirationTime">
                        <el-input style="width: 150px;" v-model.number="ruleForm.expirationTime" />
                        <el-select v-model="ruleForm.unit" class="m-2" placeholder="Select" size="default"
                            style="width: 100px;">
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
            </el-tab-pane>
            <el-tab-pane label="SETEX">
                <SetEx></SetEx>
            </el-tab-pane>
            <el-tab-pane label="SETNX">
                <SetNx></SetNx>
            </el-tab-pane>
            <el-tab-pane label="SETRANGE">
                <SetRange></SetRange>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import Tip from '../../../tips/index.vue'
import SetEx from './setex.vue';
import SetNx from './setnx.vue';
import SetRange from './setrange.vue';
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
    key: '',
    value: '',
    expirationTime: null as unknown as Number,
    unit: "PX",
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
const validateExpirationTime = (rule: any, value: any, callback: any) => {
    if (value && (typeof value !== "number")) {
        callback(new Error('Please input Number'))
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    key: [{ validator: validateKey, trigger: 'blur' }],
    value: [{ validator: validateValue, trigger: 'blur' }],
    expirationTime: [{ validator: validateExpirationTime, trigger: 'blur' }],
})
const generate = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            ruleForm.sql = `set ${ruleForm.key} ${ruleForm.value}`
            if (ruleForm.expirationTime) {
                ruleForm.sql += ` ${ruleForm.unit} ${ruleForm.expirationTime}`
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
]
</script>
<style scoped></style>
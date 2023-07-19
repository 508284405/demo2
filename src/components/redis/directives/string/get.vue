<template>
    <div>
        <h2>获取字符串</h2>
        <el-tabs type="border-card" style="height: 90%;">
            <el-tab-pane label="GET">
                <div style="display: flex;">
                    <span>示例：GET X</span>
                    <Tip :content="`获取键的值。如果键不存在，则返回特殊值 nil。如果存储在键的值不是字符串，则返回错误，因为 GET 仅处理字符串值`" :version="`1.0.0`"
                        style="margin-left: 10px;"></Tip>
                </div>
                <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                    class="demo-ruleForm">
                    <el-form-item label="value" prop="v">
                        <el-input style="width: 150px;" v-model="ruleForm.v" type="value" autocomplete="off" />
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
            <el-tab-pane label="GETDEL">
                <GetDel></GetDel>
            </el-tab-pane>
            <el-tab-pane label="GETEX">
                <GetEx></GetEx>
            </el-tab-pane>
            <el-tab-pane label="GETRANGE">
                <GetRange></GetRange>
            </el-tab-pane>
            <el-tab-pane label="GETSET">
                <GetSet></GetSet>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import Tip from '../../../tips/index.vue'
import GetDel from './getdel.vue';
import GetEx from './getex.vue';
import GetRange from './getrange.vue';
import GetSet from './getset.vue'
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
    v: '',
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
            ruleForm.sql = `get ${ruleForm.v}`
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
<template>
    <div>
        <h2>批处理</h2>
        <el-tabs type="border-card" style="height: 90%;">
            <el-tab-pane label="MGET">
                <div style="display: flex;">
                    <span>示例：get key [key ...]</span>
                    <Tip :time-complexity="`O（N），其中 N 是要检索的键数。`"
                        :content="`返回所有指定键的值。对于每个不保存字符串值或不存在的键，将返回特殊值 nil。因此，操作永远不会失败。`" style="margin-left: 10px;"></Tip>
                </div>

                <el-form ref="ruleFormRef" :model="ruleForm" status-icon label-width="120px" label-position="left"
                    class="demo-ruleForm">
                    <el-form-item v-for="(domain, index) in ruleForm.domains" :key="domain.key" :label="'Key' + index"
                        :prop="'domains.' + index + '.value'" :rules="{
                            required: true,
                            message: 'key can not be null',
                            trigger: 'blur',
                        }">
                        <el-input v-model="domain.value" />
                        <el-button class="mt-2" @click.prevent="removeDomain(domain)">Delete</el-button>
                    </el-form-item>

                    <el-form-item label="sql" prop="sql">
                        <el-input style="width: 150px;" v-model="ruleForm.sql" type="value" autocomplete="off" />
                        <el-button type="primary" @click="generate(ruleFormRef)">Generate</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="addDomain">New Key</el-button>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
                        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="MSET">
                <MSet></MSet>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import Tip from '../../../tips/index.vue'
import MSet from './mset.vue'
const ruleFormRef = ref<FormInstance>()

const generate = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            if (ruleForm.domains && ruleForm.domains.length > 0) {
                ruleForm.sql = 'mget '
                ruleForm.domains.forEach(x => {
                    ruleForm.sql += `${x.value} `
                })
                return true
            }
        }
        ruleForm.sql = 'error'
        return false
    })
}
interface DomainItem {
    key: number
    value: string
}
const ruleForm = reactive<{
    domains: DomainItem[],
    sql: String
}>({
    domains: [
        {
            key: 1,
            value: '',
        },
    ],
    sql: ''
})

const removeDomain = (item: DomainItem) => {
    const index = ruleForm.domains.indexOf(item)
    if (index !== -1) {
        ruleForm.domains.splice(index, 1)
    }
}

const addDomain = () => {
    ruleForm.domains.push({
        key: Date.now(),
        value: '',
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
    ruleForm.domains = [{
            key: 1,
            value: '',
        },]
}
</script>
<style scoped></style>
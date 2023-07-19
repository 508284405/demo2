<template>
        <div style="display: flex;">
            <span>示例：mset key value [key value...]</span>
            <Tip :time-complexity="`O（N），其中 N 是要检索的键数。`" :content="`将给定的键设置为各自的值。MSET 将现有值替换为新值，就像常规 SET 一样。如果不想覆盖现有值，请参阅 MSETNX。
MSET 是原子的，因此所有给定的键都是一次设置的。客户端无法看到某些密钥已更新，而其他密钥未更改。`"
                style="margin-left: 10px;"></Tip>
        </div>

        <el-form ref="ruleFormRef" :model="ruleForm" status-icon label-width="120px" label-position="left"
            class="demo-ruleForm">
            <el-form-item v-for="(domain, index) in ruleForm.domains" :key="domain.id" :label="'Key' + index"
                :prop="'domains.' + index + '.value'" :rules="{
                    required: true,
                    message: 'key can not be null',
                    trigger: 'blur',
                }">
                <div style="display: grid; grid-auto-flow:column;">
                    <el-input v-model="domain.key" /> <el-input v-model="domain.value" />
                </div>
                
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
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import Tip from '../../../tips/index.vue'
const ruleFormRef = ref<FormInstance>()


const generate = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            if (ruleForm.domains && ruleForm.domains.length > 0) {
                ruleForm.sql = 'mset '
                ruleForm.domains.forEach(x => {
                    ruleForm.sql += `${x.key} ${x.value} `
                })
                return true
            }
        }
        ruleForm.sql = 'error'
        return false
    })
}
interface DomainItem {
    id: number
    key: string
    value: string
}
const ruleForm = reactive<{
    domains: DomainItem[],
    sql: String
}>({
    domains: [
        {   id: 1,
            key: '',
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
        id: Date.now(),
        key: '',
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
        id: 1,
        key: '',
        value: '',
    },]
}
</script>
<style scoped></style>
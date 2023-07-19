<template>
  <div>
    <h2>拼接字符串</h2>
    <el-tabs type="border-card" style="height:90%">
      <el-tab-pane label="APPEND">
        <div style="display: flex;">
          <span>示例：APPEND key value</span>
          <Tip :content="`如果 key 已存在并且是字符串，则此命令会将值追加到字符串的末尾。如果 key 不存在，则会将其创建并设置为空字符串，因此在此特殊情况下，APPEND 将类似于 SET。`"
            v-bind:version="`2.0.0`"
            v-bind:time-complexity="`O（1）。摊销时间复杂度为 O（1），假设附加值很小并且已经存在的值是任意大小，因为 Redis 使用的动态字符串库将在每次重新分配时将可用空间加倍。`"
            style="margin-left: 10px;"></Tip>
        </div>
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
          <el-form-item label="key" prop="key">
            <el-input style="width: 150px;" v-model="ruleForm.key" type="value" autocomplete="off" />
          </el-form-item>
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
      </el-tab-pane></el-tabs>
  </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import Tip from '../../../tips/index.vue'
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  key: '',
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
  key: [{ validator: validateValue, trigger: 'blur' }],
  value: [{ validator: validateValue, trigger: 'blur' }],
})
const generate = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ruleForm.sql = `append ${ruleForm.key} ${ruleForm.v}`
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
<template>
  <div style="display: flex;">
          <span>示例：INCRBY key decrement</span>
          <Tip :content="`以增量递增存储在键处的数字。如果该键不存在，则在执行操作之前将其设置为 0。如果键包含错误类型的值或包含无法表示为整数的字符串，则会返回错误。此操作限制为 64 位有符号整数。`"
            style="margin-left: 10px;"></Tip>
        </div>
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
          <el-form-item label="key" prop="key">
            <el-input style="width: 150px;" v-model="ruleForm.key" type="value" autocomplete="off" />
          </el-form-item>
          <el-form-item label="decrement" prop="decrement">
            <el-input style="width: 150px;" v-model="ruleForm.decrement" type="value" autocomplete="off" />
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
import {isNotInteger} from '../../../../api/util'
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  key: '',
  decrement: '',
  sql: '',
})
const validateValue = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the value'))
  } else {
    callback()
  }
}

const validateDecrement = (rule: any, value: any, callback: any) => {
  if (value === '' || isNotInteger(value)) {
    callback(new Error('Please input the decrement for number'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  key: [{ validator: validateValue, trigger: 'blur' }],
  decrement: [{ validator: validateDecrement, trigger: 'blur' }],
})
const generate = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ruleForm.sql = `incrby ${ruleForm.key} ${ruleForm.decrement}`
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
<style scoped>

</style>
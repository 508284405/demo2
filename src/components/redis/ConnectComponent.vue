<template>
    <el-form :model="form" label-width="120px">
        <el-form-item label="username">
            <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="password">
            <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="database">
            <el-input-number v-model="form.database" :min="1" :max="10" />
        </el-form-item>
        <el-form-item label="isSsl">
            <el-switch v-model="form.openSsl" />
        </el-form-item>
        <el-form-item label="是否记住配置">
            <el-checkbox v-model="form.remember" size="large" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive } from 'vue'
import { connect } from '../../api/redis/connect'
import { get } from '../../api/redis/get'
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps({
    _id: Number
})

// do not use same name with ref
let form = reactive({
    id: props._id,
    password: null,
    username: null,
    database: 0,
    remember: true,
    openSsl: false,
})

const onSubmit = () => {
    form.id = props._id
    connect(form).then((res: any) => {
        if (res.data.code == 0) {
            router.push({
                path: "/redis/home",
                query:{
                    id: props._id
                }
            })
        } else {
            alert(res.data.message)
        }
    })
}

const init = () => {
    get(props._id as number).then((res: any) => {
        if (res.data.code == 0) {
            form = res.data.data
        }
    })
}
//暴露子组件方法给父组件调用
defineExpose({
    init
})
</script>
  
<template>
    <div class="mb-2 flex items-center text-sm">
        <el-radio-group v-model="model" class="ml-4">
            <el-radio label=1 size="large">单机</el-radio>
            <el-radio label=2 size="large">主从</el-radio>
            <el-radio label=3 size="large">哨兵</el-radio>
            <el-radio label=4 size="large">集群</el-radio>
        </el-radio-group>
    </div>
    <el-input v-model="textarea" :rows="2" type="textarea" placeholder="请输入机器地址，用英文:分割ip和端口，多个请换行" />
    <el-button class="submit" type="primary" @click="submit(textarea,model)">submit</el-button>
</template>
    
<script lang="ts" setup>
import { ref } from 'vue';
import { create } from '../../api/redis/createInstance'
import { useRouter } from "vue-router";
const router = useRouter()
const textarea = ref('')
const model = ref()
const submit = ref(function a(ips: string,model: number) {
    var ipArray = ips.split('\n')
    create({
        ips: ipArray,
        model: model
    }).then((res: any) => {
        if (res.code == 0) {
            //创建成功
            alert("创建成功")
        } else {
            //创建失败
            alert(res.message)
        }
        router.push('/redis')
    })
})
</script>
    
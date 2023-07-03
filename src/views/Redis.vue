<template>
    <el-popover placement="right" :width="400" trigger="click">
        <template #reference>
            <el-button class="submit" type="primary">添加</el-button>
        </template>
        <AddComponent></AddComponent>
    </el-popover>
    <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all
        :tree-props="{ children: 'vos', hasChildren: 'hasVos' }">
        <el-table-column fixed prop="ip" label="IP" width="180" />
        <el-table-column prop="port" label="PORT" width="180" />
        <el-table-column prop="model" label="模式" width="180">
            <template #default="scope">
                {{ model[scope.row.model] }}
            </template>

        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="id" fixed="right" label="Operations" width="180">
            <template #default="scope">
                <el-popover placement="right" :width="400" trigger="click">
                    <template #reference>
                        <el-button link type="primary" size="small" @click="passId(scope.row.id)">connect</el-button>
                    </template>
                    <ConnectComponent ref="connectComponentRef" v-if="_display" :_id="_id">
                    </ConnectComponent>
                </el-popover>
                <el-button link type="primary" size="small">delete</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
  
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { list, RedisInfoVo } from '../api/redis/list'
import AddComponent from "../components/redis/AddComponent.vue";
import ConnectComponent from "../components/redis/ConnectComponent.vue";
import model from '../api/redis/common'

var tableData = ref([RedisInfoVo])
function lista(data: {}) {
    list(data).then((res) => {
        tableData.value = res.data.records
    })
}
const _id = ref()
const _display = ref(false)
//定义子组件实例
const connectComponentRef = ref<InstanceType<typeof ConnectComponent>>()
const passId = (id: number) => {
    _id.value = id
    _display.value = true
    if (connectComponentRef.value != null){
        // console.log(connectComponentRef.value)
        connectComponentRef.value?.init()
    }
}

onMounted(() => {
    lista({})
})
</script>

<style>
.submit {
    float: right;
}
</style>
  
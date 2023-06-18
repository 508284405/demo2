<template>
    <el-popover placement="right" :width="400" trigger="click">
        <template #reference>
            <el-button class="submit" type="primary">添加</el-button>
        </template>
        <AddComponent></AddComponent>
    </el-popover>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="ip" label="ip" width="180" />
        <el-table-column prop="port" label="port" width="180" />
        <el-table-column prop="model" label="模式" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column fixed="right" label="Operations" width="120">
            <template #default>
                <el-button link type="primary" size="small">Detail</el-button>
                <el-button link type="primary" size="small">Edit</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
  
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { list, RedisInfoVo } from '../api/redis/list'
import AddComponent from "../components/AddComponent.vue";

var tableData = [{}]
function lista(data: {}) {
    list(data).then((res) => {
        tableData = res.data.records
        console.log('a: ',tableData)
    })
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
  
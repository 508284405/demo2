<template>
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="command-name" label="name" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
    </el-table>
</template>
  
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { page } from '../../../api/redis/command'
import { useRoute } from 'vue-router';
const route = useRoute()
const id = (Number)(route.query.id)
const tableData = ref([
    {

    }
])
defineExpose({
    page: function () {
        console.log('1234')
        page(id, {
            pageNo: 1,
            pageSize: 10
        }).then(res => {
            for (let index = 0; index < res.data.records.length; index++) {
                tableData.value[index] = {
                    "command-name" : res.data.records[index]
                }
            }
        })
    }
})


</script>
  
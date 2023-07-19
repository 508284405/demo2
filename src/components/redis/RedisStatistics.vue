<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="getStatistics(activeName)">
        <el-tab-pane label="Server" name="Server"/>
        <el-tab-pane label="Clients" name="Clients"/>
        <el-tab-pane label="Memory" name="Memory"/>
        <el-tab-pane label="Persistence" name="Persistence"/>
        <el-tab-pane label="Stats" name="Stats"/>
        <el-tab-pane label="Replication" name="Replication"/>
        <el-tab-pane label="Modules" name="Modules"/>
        <el-tab-pane label="Cluster" name="Cluster"/>
        <el-tab-pane label="Keyspace" name="Keyspace"/>
    </el-tabs>
    <div style="margin-top: 20px;">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="properties" label="属性" width="500px" />
            <el-table-column prop="value" label="值" width="500px" />
        </el-table>
    </div>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { statistics } from '../../api/redis/statistics'
const route = useRoute()
const id = (Number)(route.query.id)
const activeName = ref("Server")
const tableData = ref([{
    properties: '',
    value: ''
}])
const getStatistics = (name: string) => {
    statistics(id, name).then((res: any) => {
        if (res.data.code == 0) {
            tableData.value = res.data.data
        } else {
            alert(res.data.message)
        }
    })
}

onMounted(() => {
    getStatistics(activeName.value)
})

</script>
<style scoped>
.demo-tabs {
    margin-left: 10px;
}
</style>
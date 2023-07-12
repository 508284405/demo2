<template>
    <header>
        <el-button name="Server" @click="getStatistics('Server')">Server</el-button>
        <el-button name="Clients" @click="getStatistics('Clients')">Clients</el-button>
        <el-button name="Memory" @click="getStatistics('Memory')">Memory</el-button>
        <el-button name="Persistence" @click="getStatistics('Persistence')">Persistence</el-button>
        <el-button name="Stats" @click="getStatistics('Stats')">Stats</el-button>
        <el-button name="Replication" @click="getStatistics('Replication')">Replication</el-button>
        <el-button name="Modules" @click="getStatistics('Modules')">Modules</el-button>
        <el-button name="Cluster" @click="getStatistics('Cluster')">Cluster</el-button>
        <el-button name="Keyspace" @click="getStatistics('Keyspace')">Keyspace</el-button>

    </header>

    <div style="margin-top: 20px;">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="properties" label="属性" width="500px" />
            <el-table-column prop="value" label="值" width="500px" />
        </el-table>
    </div>
</template>
<script setup lang='ts'>
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import { statistics } from '../../api/redis/statistics'
const route = useRoute()
const id = (Number)(route.query.id)
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

</script>
<style scoped>
.el-button {
    margin: 20px 0px 0px 3px;
    width: 100px;
    color: rgba(0, 0, 0, .5);
}
</style>
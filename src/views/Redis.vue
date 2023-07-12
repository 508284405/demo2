<template>
    <div class="demo-input-suffix">
        <el-row style="margin-bottom: 10px; display: flex; ">
            <div class="block childInput">
                <el-date-picker v-model="searchData.createTimeBegin" type="daterange" range-separator="To" start-placeholder="Start date"
                    end-placeholder="End date"/>
            </div>
            <el-input v-model="searchData.ip" class="w-50 m-2 childInput" style="width: 200px;" placeholder="ip"
                :prefix-icon="Search" />
            <el-button class="search childInput" type="primary" @click="lista(searchData)">搜索</el-button>
            <el-popover placement="right" trigger="click">
                <template #reference>
                    <el-button class="submit childInput" type="primary">添加</el-button>
                </template>
                <AddComponent></AddComponent>
            </el-popover>
        </el-row>
    </div>

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
        <el-table-column prop="id" fixed="right" label="Operations" width="280">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="test_connect(scope.row.id)">test-connect</el-button>
                <el-popover placement="right" :width="400" trigger="click">
                    <template #reference>
                        <el-button link type="primary" size="small" @click="passId(scope.row.id)">connect</el-button>
                    </template>
                    <ConnectComponent ref="connectComponentRef" v-if="_display" :_id="_id">
                    </ConnectComponent>
                </el-popover>
                <el-button link type="primary" size="small">delete</el-button>
                <!-- <el-alert title="success alert" type="success" description="more text description" show-icon="false" />ƒ -->
            </template>
        </el-table-column>
    </el-table>
</template>
  
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { list, RedisInfoVo, type SearchDataType } from '../api/redis/list'
import { testConnect } from '../api/redis/test-connect'
import AddComponent from "../components/redis/AddComponent.vue";
import ConnectComponent from "../components/redis/ConnectComponent.vue";
import model from '../api/redis/common'
import { Search } from '@element-plus/icons-vue';

//表单
var tableData = ref([RedisInfoVo])

const searchData = ref<SearchDataType>({
    createTimeBegin: null,
    createTimeEnd: null,
    ip: '',
    model: null,
})
function lista(data: SearchDataType | {}) {
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
    if (connectComponentRef.value != null) {
        // console.log(connectComponentRef.value)
        connectComponentRef.value?.init()
    }
}

const test_connect = (id: number) => {
    testConnect(id).then((res => {
        if (res.data.code == 0) {
            alert("测试成功")
        } else {
            alert(res.data.message)
        }
    }))
}


onMounted(() => lista({}))
</script>

<style>
.submit {
    float: right;
}

.childInput {
    margin-right: 20px;
}
</style>
  
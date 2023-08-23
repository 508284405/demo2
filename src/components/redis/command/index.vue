<template>
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="commandName" label="CommandName" width="180" />
        <el-table-column prop="arity" label="操作" width="180">
            <template #default="scope">
                <el-button type="info" @click="info(scope.row.commandName)">Info</el-button>
                <el-button type="warning" @click="docs(scope.row.commandName)">docs</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 50, 100]"
        :small="false" :disabled="false" :background="true" layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <el-dialog v-model="infoDialogVisible" title="INFO" width="30%" draggable>
        <el-form :model="infoFormData" label-width="120px">
            <el-form-item label="command-name">
                <el-input v-model="infoFormData.commandName" />
            </el-form-item>
            <el-form-item label="arity">
                <el-input v-model="infoFormData.arity" />
            </el-form-item>
            <el-form-item label="flags">
                <el-input v-model="infoFormData.flags" />
            </el-form-item>
            <el-form-item label="firstKey">
                <el-input v-model="infoFormData.firstKey" />
            </el-form-item>
            <el-form-item label="lastKey">
                <el-input v-model="infoFormData.lastKey" />
            </el-form-item>
            <el-form-item label="step">
                <el-input v-model="infoFormData.lastKey" />
            </el-form-item>
            <el-form-item label="acl-categories">
                <el-input v-model="infoFormData.aclCategories" />
            </el-form-item>
            <el-form-item label="tips">
                <el-input v-model="infoFormData.tips" />
            </el-form-item>
            <el-form-item label="subcommands">
                <el-input v-model="infoFormData.subcommands" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="infoDialogVisible = false">确认</el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="docsDialogVisible" title="DOCS" width="30%" draggable>
        <el-form :model="docsFormData" label-width="120px">
            <el-form-item label="command-name">
                <el-input v-model="docsFormData.commandName" />
            </el-form-item>
            <el-form-item label="summary">
                <el-input v-model="docsFormData.summary" />
            </el-form-item>
            <el-form-item label="since">
                <el-input v-model="docsFormData.since" />
            </el-form-item>
            <el-form-item label="group">
                <el-input v-model="docsFormData.group" />
            </el-form-item>
            <el-form-item label="complexity">
                <el-input v-model="docsFormData.complexity" />
            </el-form-item>
            <el-form-item label="history">
                <el-input v-model="docsFormData.history" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="docsDialogVisible = false">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { page } from '../../../api/redis/command'
import { useRoute } from 'vue-router';
import { infoDetail,docsDetail } from '../../../api/redis/command'

const route = useRoute()
const id = (Number)(route.query.id)
const tableData = ref([{
    commandName: ""
}])
//info
const infoDialogVisible = ref(false)
const infoFormData = ref({
    commandName: '',
    arity: '',
    flags: '',
    firstKey: '',
    lastKey: '',
    aclCategories: '',
    tips: '',
    subcommands: '',
})
//docs
const docsDialogVisible = ref(false)
const docsFormData = ref({
    commandName: '',
    summary: '',
    since: '',
    group: '',
    complexity: '',
    history: '',
})
//分页
const handleSizeChange = (val: number) => {
    pageSize.value = val
    changePage()
}
const handleCurrentChange = (val: number) => {
    currentPage.value = val
    changePage()
}
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0)
onMounted(() => {
    changePage()
})

const info = (commandName: string) => {
    infoDialogVisible.value = true
    infoDetail(id, commandName).then(res => {
        if (res.data.code == 0) {
            infoFormData.value = res.data.data
        }
    })
}
const docs = (commandName: string)=>{
    docsDialogVisible.value = true
    docsDetail(id, commandName).then(res => {
        if (res.data.code == 0) {
            docsFormData.value = res.data.data
        }
    })
}

const changePage = () => page(id, {
    pageNo: currentPage.value,
    pageSize: pageSize.value
}).then(res => {
    for (let index = 0; index < res.data.records.length; index++) {
        tableData.value[index] = {
            commandName: res.data.records[index]
        }
    }
    total.value = res.data.total
})

</script>
<style>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>
  
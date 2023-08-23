<template>
  <div>
    <header style="margin-top: 10px; margin-left: 10px;">
      <el-input style="width: 150px;" placeholder="请输入查询参数" v-model="param"></el-input>
      <el-button type="primary" @click="changePage(param)" style="margin-left: 10px;">Primary</el-button>
    </header>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="field" label="属性" width="180" />
      <el-table-column prop="value" label="值" width="180" />
    </el-table>
    <el-pagination style="margin-top: 10px;" v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 50, 100]"
      :small="false" :disabled="false" :background="true" layout="total, sizes, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { page } from '../../../api/redis/config'
import { useRoute } from 'vue-router';
const param = ref()
const route = useRoute()
const id = route.query.id
const tableData = ref([{
  field: '',
  value: ''
}])
//分页
const handleSizeChange = (val: number) => {
  pageSize.value = val
  changePage(param.value)
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  changePage(param.value)
}
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0)
onMounted(()=>{
  changePage("")
})
const changePage = (parameter:string) => page({
  id: id,
  parameter: parameter,
  pageNo: currentPage.value,
  pageSize: pageSize.value
}).then(res => {
  tableData.value = res.data.records
  total.value = res.data.total
})
</script>
<style scoped></style>
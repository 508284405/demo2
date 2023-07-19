<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="Docs" name="docs">docs</el-tab-pane>
      <el-tab-pane label="Info" name="info">
        <Info ref="inforef"></Info>
      </el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue'
  import type { TabsPaneContext } from 'element-plus'
  import Info from './info.vue';
  
  const activeName = ref('first')
  const inforef = ref<InstanceType<typeof Info>>()
  
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(222)
    inforef.value?.page()
  }
  </script>
  <style>
  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
  </style>
  
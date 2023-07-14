<template>
    <el-container class="layout-container-demo" style="height: 500px">
      <el-aside width="200px">
        <RedisAside :id = 'id'></RedisAside>
      </el-aside>
      <el-container>
        <el-header class="header" style="text-align: right; font-size: 12px">
          <RedisHeader></RedisHeader>
        </el-header>
  
        <el-main style="margin: 10px;">
          <RouterView/>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
  import RedisAside from './RedisAside.vue';
  import RedisHeader from './RedisHeader.vue'
  import { useRoute } from 'vue-router';
  const route = useRoute()
  const id = (Number)(route.query.id)
  </script>
  
  <style scoped>
  .layout-container-demo {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }
  .layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
  }
  .layout-container-demo .el-menu {
    border-right: none;
  }
  .layout-container-demo .el-main {
    padding: 0;
  }
  .layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  }
  .el-main{
    background-color: rgb(248, 252, 252);
  }
  .header{
    background-color: rgb(248, 252, 252);
  }
  </style>
  
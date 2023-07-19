<template>
    <el-tabs type="border-card">
      <el-tab-pane label="String">
        <RedisString></RedisString>
      </el-tab-pane>
      <el-tab-pane label="List">
        <RedisList></RedisList>
      </el-tab-pane>
      <el-tab-pane label="Hash">
        <RedisHash></RedisHash>
      </el-tab-pane>
      <el-tab-pane label="Set">
        <RedisSet></RedisSet>
      </el-tab-pane>
      <el-tab-pane label="SortSet">
        <RedisSortSet></RedisSortSet>
      </el-tab-pane>
    </el-tabs>
  </template>
  
<script setup lang='ts'>
import RedisString from './string/index.vue';
import RedisList from './RedisList.vue';
import RedisHash from './RedisHash.vue';
import RedisSortSet from './RedisSortSet.vue';
import RedisSet from './RedisSet.vue';
</script>
<style scoped>

</style>
<template>
  <div>
    <el-tooltip
        class="box-item"
        effect="dark"
        :content="`Available since: ${version?version:`1.0.0`} <br/> Time complexity: ${timeComplexity?timeComplexity:`O(1)`} <br/> content: ${content}`"
        placement="top-start"
        raw-content
      >
        <el-button circle size="small">?</el-button>
      </el-tooltip>
  </div>
</template>
<script setup lang='ts'>
import { version } from 'vue';

defineProps({
    content: String,
    version: String,
    timeComplexity: String
})
</script>
<style scoped>

</style>
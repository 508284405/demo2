<template>
    <div>
        <div style="display:grid; grid-auto-flow: column;">
            <AppEnd></AppEnd>
            <Set></Set>
            <Get></Get>
        </div>
        <div style="display:flex;">
            <Decr></Decr>
            <MGet></MGet>
        </div>
    </div>
</template>
<script setup lang='ts'>
import AppEnd from './append.vue';
import Set from './set.vue'
import Get from './get.vue'
import Decr from './decr.vue';
import MGet from './mget.vue'
//get

</script>
<style scoped>
el-input {
    width: 100px;
}
</style>
<template>
    <div>
        注册
        <el-button type="primary">去登陆</el-button>
    </div>
</template>
<script setup lang="ts">

//给父组件传值
const emit = defineEmits(['on-click'])
const gotoLogin = () => {
    emit('on-click','login')
}
</script>
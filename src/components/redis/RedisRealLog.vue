<template>
  <div>redis log</div>
</template>
<script setup lang='ts'>
import { onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = (Number)(route.query.id)
const token = sessionStorage.getItem("token")
const socket = new WebSocket('ws://192.168.3.65:8080/redis/redis/reallog',[`${token}`,`${id}`])

socket.onopen = ()=>{
    console.log("websocket 连接已经打开")
}
socket.onmessage = (event) =>{
    console.log(event.data)
}
socket.onclose = (e)=>{
    console.log("websocket 连接已经关闭",e)
}
socket.onerror = (error)=>{
    console.log("websocket 发生错误",error)
}

onBeforeUnmount(()=>{
    socket.close
})

</script>
<style scoped>

</style>
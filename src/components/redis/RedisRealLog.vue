<template>
    <header style="border: 1px white solid;">
        <el-button type="danger" plain @click="open">开启</el-button>
        <el-button type="success" plain @click="close">关闭</el-button>
    </header>
    <el-scrollbar ref="scrollbarRef" max-height="400px">
        <div ref="innerRef">
            <p v-for="item in message" :key="item" class="scrollbar-demo-item">
                {{ item }}
            </p>
        </div>
    </el-scrollbar>
</template>
<script setup lang='ts'>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import socket from '../../api/websocket';
import { ElScrollbar } from 'element-plus'


const route = useRoute()
const id = (Number)(route.query.id)
const token = sessionStorage.getItem("token")
const message = ref<any>([])
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const innerRef = ref<HTMLDivElement>()



socket.onmessage = (event) => {
    message.value.push(event.data)
    scrollbarRef.value!.setScrollTop(scrollbarRef.value!.ratioY)
}
const open = () => {
    //发送获取日志指令
    if (token && id) {//共享服务端一个jedis对象
        socket.send(JSON.stringify({
            type: "reallog",
            id: id,
            openFlag: true
        }))
    }
    console.log("websocket 连接已经打开")
}

const close = () => {
    //发送获取日志指令
    if (token && id) {
        socket.send(JSON.stringify({
            type: "reallog",
            id: id,
            openFlag: false
        }))
    }
}

const setScrollTop = (scrollTop: number)=>{

}

</script>
<style scoped>
.scrollbar-demo-item {
    border: 1px black solid;
}
</style>
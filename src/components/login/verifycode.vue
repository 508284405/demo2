<template>
    <div class="code" @click="refreshCode" title="刷新验证码">
        <img class="verification-code" :src="verificationUrl" alt="验证码" loading='lazy' />
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { verifyCodeImage } from "../../api/login/verifycode"
// 验证码请求地址
const verificationUrl = ref()

/**
 * 点击刷新
 */
const refreshCode = async () => {
    const random = Math.floor(Math.random() * 10000)
    emit('on-random',random)//把随机数给父组件
    verifyCodeImage(random).then((res: any) => {
        const data = res.data
        const base64 = btoa(new Uint8Array(data).reduce((acc, byte) => acc + String.fromCharCode(byte), ''));
        verificationUrl.value = `data:image/png;base64,${base64}`;
    })
}

//组件加载完成执行
onMounted(()=>{
    refreshCode()
})

//传递随机数给父组件
const emit = defineEmits(['on-random'])

//暴露方法给父组件调用
defineExpose({
    refreshCode
})
</script>
  
<style lang="scss" scoped>
.verification-code {
    vertical-align: middle;
    cursor: pointer;
    max-width: 100%;
    max-height: 100%;
}
</style>
  
  
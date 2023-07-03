<template>
    <component :is="who">
        <login @on-click="getname"></login>
        <register @on-click="getname"></register>
    </component>
    <!-- <button @click="a"></button> -->
</template>
  
<script setup lang="ts">
import { markRaw, ref } from 'vue'
import login from '../components/login/login.vue'
import register from '../components/login/register.vue'

const who = ref(login)
const getname = (name:string) => {
    console.log(name)
    // who.value = name
}

</script>
  
<style lang="scss" scoped></style>
  
  
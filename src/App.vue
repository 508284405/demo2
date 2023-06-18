<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterLink to="/login" background-color="red"/>

  <RouterView />
</template>

<style scoped>
a.router-link-exact-active {
  background-color: transparent;
  background-image: url(https://tse4-mm.cn.bing.net/th/id/OIP-C.YKoZzgmubNBxQ8j-mmoTKAHaEK?pid=ImgDet&rs=1);
  float: left;
}
</style>

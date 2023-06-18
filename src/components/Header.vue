<template>
    <el-header>
        <h1>张三</h1>
        <el-button class="header" type="info" @click="logout">退出</el-button>
    </el-header>
</template>
<script lang="ts">
export default {
    methods: {
        logout() {
            window.sessionStorage.clear()
            this.$router.push('/login')
        }
    }
}
</script>
<style lang="less" scoped>
.home_container {
    height: 50em;
}

.el-header {
    background-color: rgb(231, 226, 226);
    // 给头部设置一下弹性布局
    display: flex;
    // 让它贴标左右对齐
    justify-content: right;
    // 清空图片左侧padding
    padding-left: 0;
    // 按钮居中
    align-items: right;
    // 文本颜色
    color: #fff;
    // 设置文本字体大小
    font-size: 20px;

    height: 40px;

    // 嵌套
    >div {
        // 弹性布局
        display: flex;
        // 纵向上居中对齐
        align-items: center;

        // 给文本和图片添加间距，使用类选择器
        span {
            margin-left: 15px;
        }
    }

}
</style>
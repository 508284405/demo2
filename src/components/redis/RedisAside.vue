<template>
    <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <message />
                    </el-icon>Redis
                </template>
                <el-menu-item-group>
                    <template #title>日志</template>
                    <el-menu-item index="1-1" @click="to('/redis/reallog')">实时日志</el-menu-item>
                    <el-menu-item index="1-2">日志列表</el-menu-item>
                    <el-menu-item index="1-3" @click="to('/redis/statistics')">统计信息</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group 2">
                    <el-menu-item index="1-3">Option 3</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title>Option4</template>
                    <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon><icon-menu /></el-icon>Navigator Two
                </template>
                <el-menu-item-group>
                    <template #title>Group 1</template>
                    <el-menu-item index="2-1">Option 1</el-menu-item>
                    <el-menu-item index="2-2">Option 2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group 2">
                    <el-menu-item index="2-3">Option 3</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="2-4">
                    <template #title>Option 4</template>
                    <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <setting />
                    </el-icon>Navigator Three
                </template>
                <el-menu-item-group>
                    <template #title>Group 1</template>
                    <el-menu-item index="3-1">Option 1</el-menu-item>
                    <el-menu-item index="3-2">Option 2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group 2">
                    <el-menu-item index="3-3">Option 3</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="3-4">
                    <template #title>Option 4</template>
                    <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
        </el-menu>
    </el-scrollbar>
</template>
<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
const props = defineProps({
    id: Number
})
const router = useRouter()
const to = (url: string) => {
    router.push({
        path: url,
        query: {
            id: props.id
        }
    })
}
</script>
<style scoped></style>
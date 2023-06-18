<template>
    <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" :collapse-transition="false"
        active-text-color="#ffd04b">
        <h3>后台管理</h3>
        <el-menu-item :index="item.path + ''" v-for="item in modellist" :key="item.label">
            <component class="icons" :is="item.icon"></component>
            <span @click="fa(item)">{{ item.label }}</span>
        </el-menu-item>
    </el-menu>
</template>


<script lang="ts">
import { useRouter } from "vue-router";
export default {
    setup() {
        class Model {
            path: string;
            name: string;
            label: string;
            icon: string;
            url: string;
            constructor(path: '', name: '', label: '', icon: '', url: '') {
                this.path = path
                this.name = name
                this.label = label
                this.icon = icon
                this.url = url
            }
        }
        const modellist = [
            // new Model('','','','',''),
            {
                path: '/zookeeper',
                name: 'zookeeper',
                label: 'zookeeper',
                icon: 'zookeeper',
                url: '/zookeeper'
            },
            {
                path: '/nacos',
                name: 'nacos',
                label: 'nacos',
                icon: 'nacos',
                url: '/nacos'
            },
            {
                path: '/mysql',
                name: 'mysql',
                label: 'mysql',
                icon: 'mysql',
                url: '/mysql'
            },
            {
                path: '/redis',
                name: 'redis',
                label: 'redis',
                icon: 'redis',
                url: '/redis'
            },
            {
                path: '/kafka',
                name: 'kafka',
                label: 'kafka',
                icon: 'kafka',
                url: '/kafka'
            },
            {
                path: '/user',
                name: 'user',
                label: '用户管理',
                icon: 'user',
                url: '/user'
            },
            {
                label: '聊天室',
                name: 'chat',
                icon: 'chat',
                path: '/chat',
                url: '/chat'
            },
        ];
        const router = useRouter()
        function fa(model:any){
            console.log("fa")
            router.push(model.url)
        }
        return {
            modellist,
            fa,
        }
    }
}
</script>

<style lang="less" scoped>
.icons {
    width: 18px;
    height: 18px;
    margin-right: 4px;
}

.el-menu-vertical-demo {
    width: 100%;
    border-right: none;

    h3 {
        color: #fff;
        text-align: center;
        margin-top: 10px;
    }
}
</style>

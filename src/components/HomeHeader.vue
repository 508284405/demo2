<template>
    <el-header>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                {{ user.name="1" }}
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="a">个人资料</el-dropdown-item>
                    <el-dropdown-item>设置</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                    <el-dropdown-item divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <el-avatar @click="profileDialogTableVisible = true"
        :src="user.profilePictureUrl" />
        <el-dialog v-model="profileDialogTableVisible" title="上传头像" style="width: 500px;">
            <el-upload class="avatar-uploader" :action="common.uploadUrl"
                :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
            <div style="text-align: right;">
                <el-button type="primary" style="display: inline-block;" plain @click="upload(imageUrl)">提交</el-button>
            </div>
        </el-dialog>
    </el-header>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { get,modifyProfilePicture } from '../api/login/user'
import { onMounted, ref } from 'vue';
import { ElMessage, uploadBaseProps, type UploadProps } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
import common from '../request/common'

const router = useRouter()
const uid = sessionStorage.getItem("uid") as unknown as number;
const user = ref({
    name: 'Tom',
    profilePictureUrl: ""
})
onMounted(() => {
    get(uid).then(res => {
        if (res.data.code == 0) {
            user.value = res.data.data
        }
    })
})

const handleCommand = (command: string | number | object) => {
    router.push("/self")
    ElMessage(`click on item ${command}`)
}

const logout = () => {
    window.sessionStorage.clear()
    router.push('/login')
}
const profileDialogTableVisible = ref(false)
const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
    if(response.code==0){
        imageUrl.value = response.data
    }else{
        ElMessage("上传失败")
    }
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type == 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
const upload = (url:string)=>{
    modifyProfilePicture(uid,url).then(res=>{
        if(res.data.code == 0){
            user.value.profilePictureUrl = url
            profileDialogTableVisible.value = false
            ElMessage("上传成功")
        }
        imageUrl.value = ""
    })
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
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 400px;
  height: 178px;
  text-align: center;
}
</style>
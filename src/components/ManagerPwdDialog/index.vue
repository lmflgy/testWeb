<!-- 选择上级 -->
<template>
  <el-dialog v-model="props.dialogVisible" title="请输入管理员审批密码" width="476" :before-close="close"
    :close-on-click-modal="publicConfigStore.dialogClickBoo" align-center>
    
    <!-- 管理员审批密码 -->
    <div class="export-con">
      <div style="margin-bottom: 20px;">请输入管理员审批密码：</div>
      <div>
        <el-input type="password" v-model="password" placeholder="请输入" show-password />
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCommit">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import {
  publicConfigStore
} from '@/store/modules/publicConfig'
import { getTopUserList } from "@/api/system/common";
import { ref, watch } from 'vue';
import { encrypt, decrypt } from "@/utils/sm4.js";
import Cookies from "js-cookie";

const emits = defineEmits()
const {
  proxy
} = getCurrentInstance();

//父组件传过来的值
const props = defineProps({
  dialogVisible: Boolean,
  titleDialog: String

});
//审核密码
const password = ref('')


//方法
const close = () => {
  const key = Cookies.get("key");
  let pwd = encrypt(password.value,key)
  emits('closes', false,pwd)
  password.value = ''
}

//提交数据
const handleCommit = () => {
  if (!password.value) {
    proxy.$modal.msgError(`请输入审核密码!`);
    return false
  }
  close()
}


</script>
<style lang="scss" scoped>
.export-con {
  padding: 0 20px;
  margin: 0 80px;
}
</style>

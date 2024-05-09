<!-- 选择上级 -->
<template>
  <el-dialog v-model="props.dialogVisible" :title="titleDialog" width="476" :before-close="close"
    :close-on-click-modal="publicConfigStore.dialogClickBoo" align-center>
    <!-- 选择审核的上级 -->
    <div class="export-con">
      <div style="margin-bottom: 20px;">选择所需{{ props.titleDialog }}操作审核的上级：</div>
      <div>
        <el-select v-model="userId" placeholder="请选择" clearable>
          <el-option v-for="(item, index) in list" :key="index" :label="item.nickName" :value="item.userName" />
        </el-select>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
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
const emits = defineEmits()
const {
  proxy
} = getCurrentInstance();

//父组件传过来的值
const props = defineProps({
  dialogVisible: Boolean,
  titleDialog: String

});

//上级name
const userId = ref('')

//上级
const list = ref([])


//方法
const close = () => {
  emits('closes', false, userId.value)
  userId.value = ''
 
}

//提交数据
const handleCommit = () => {
  if (!userId.value) {
    proxy.$modal.msgError(`请选择上级审核人!`);
    return false
  }
  close()
}
//获取上级
const getSuperior = async () => {
  const res = await getTopUserList({})
  list.value = res.data
}

getSuperior()
</script>
<style lang="scss" scoped>
.export-con {
  padding: 0 20px;
  margin: 0 80px;
}
</style>

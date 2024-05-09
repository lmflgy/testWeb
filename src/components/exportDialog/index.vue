<!-- 数据导出 -->
<template>
  <el-dialog
    v-model="props.dialogVisible"
    title="导出"
    width="476"
    :before-close="close"
    :close-on-click-modal="publicConfigStore.dialogClickBoo"
    align-center
  >
    <div class="export-con">
        <div style="margin-bottom: 20px;">{{introduce}}：</div>
        <div>
            <el-date-picker
            v-model="exportTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            />
        </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleCommit">导出</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import {
    publicConfigStore
} from '@/store/modules/publicConfig'
import { ref } from 'vue';
const emits = defineEmits()
const {
    proxy
} = getCurrentInstance();

//父组件传过来的值
const props = defineProps({
    dialogVisible: Boolean,
    introduce:String
});
//导出时间
const exportTime = ref([])

//方法
const close = ()=>{
    emits('closes', false,exportTime.value)
    exportTime.value = []
}
//提交数据
const handleCommit = () => {
  if (exportTime.value.length<0) {
    proxy.$modal.msgError(`请选择导出时间范围!`);
    return false
  }
  close()
}
</script>
<style lang="scss" scoped>
.export-con{
    padding: 0 20px;
}
</style>

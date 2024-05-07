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
        <div style="margin-bottom: 20px;">选择所需导出日志时间范围：</div>
        <div>
            <el-date-picker
            v-model="exportTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            />
        </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">导出</el-button>
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
    dialogVisible: Boolean
});
//导出时间
const exportTime = ref([])

//方法
const close = ()=>{
    emits('close', false)
}
</script>
<style lang="scss" scoped>
.export-con{
    padding: 0 20px;
}
</style>

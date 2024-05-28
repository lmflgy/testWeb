<template>
    <div class="tab-con">
        <div class="table-total">
            <div>
                共 <span class="count">{{ total }}</span> 条数据
            </div>
            <el-button type="primary" class="export" @click="handleExport(true)">导出</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange"
            :stripe="publicConfigStore.tableStripe" :align="publicConfigStore.tableAlign" :header-cell-style="{
                    background: publicConfigStore.tableHeaderBg,
                    color: publicConfigStore.color333,
                    fontWeight: publicConfigStore.tableHeaderBold,
                    fontSize: publicConfigStore.tableHeaderFont,
                }">
            <el-table-column type="index" label="序号" :width="publicConfigStore.tableIndexWidth" />
            <el-table-column label="操作名称" :show-overflow-tooltip="true" prop="operationType"
                :align="publicConfigStore.tableAlign">
                <template #default="scope">
                    <dict-tag :options="dictData.sys_oper_type" :value="scope.row.operationType" />
                </template>
            </el-table-column>
            <el-table-column label="申请人" :show-overflow-tooltip="true" prop="createBy"  :align="publicConfigStore.tableAlign"></el-table-column>
            <el-table-column label="处理人" :show-overflow-tooltip="true" prop="auditUser"  :align="publicConfigStore.tableAlign"></el-table-column>
            <el-table-column label="完成时间" :show-overflow-tooltip="true" prop="createTime"  :align="publicConfigStore.tableAlign"></el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize" @pagination="pageInit" />
    </div>
    <!-- 导出 -->
    <exportDialog :dialogVisible="exportDialogVisible" introduce="按用户操作时间导出" @closes="handleExportFinash" @cancel="cancelDialog"></exportDialog>
    <!-- 上级审核人 -->
    <SuperiorDialog :dialogVisible="superiorDialogVisible" @closes="handleSuperior" @cancel="cancelDialog" :title="titleDialog"></SuperiorDialog>
    <!-- 审核密码 -->
    <ManagerPwdDialog :dialogVisible="managerPwdDialogVisible" @closes="handleManagerPwd" @cancel="cancelDialog"></ManagerPwdDialog>
</template>
<script setup name="CustomerHistoryTable">
import {
    publicConfigStore
} from '@/store/modules/publicConfig'
const { proxy } = getCurrentInstance();
import { useRoute } from 'vue-router';
const route = useRoute();
import { ref } from "vue";
//注入请求接口
import { getZUserAuditLogInfo} from "@/api/system/customer";
const { sys_oper_type } = proxy.useDict("sys_oper_type");
//页面中用到的字典数据
const dictData = ref({ sys_oper_type: sys_oper_type });
//页面变量
const form = ref({})
//查询表单
const queryParams = ref({
    date: [],
    pageNum: 1,
    pageSize: 10
});
//数据列表
const tableData = ref([]);
const total = ref(0);
//弹框标题
const titleDialog = ref('');
//审核人
const superiorName = ref('')
//导出弹框
const exportDialogVisible = ref(false)
//上级审核弹框
const superiorDialogVisible = ref(false)
//输入密码弹框
const managerPwdDialogVisible = ref(false)

//点击 导出
const handleExport = (boo) => {
    exportDialogVisible.value = boo
}
//确认导出之后
const handleExportFinash = (boo, date) => {
    typeSelect.value = 2
    if (date && date.length > 0) {
        exportDate.value = date
        superiorDialogVisible.value = true
    }
    exportDialogVisible.value = false
}
//选择上级完成
const handleSuperior = (boo, userId) => {
    if (userId) {
        superiorName.value = userId
        managerPwdDialogVisible.value = true
    }
    superiorDialogVisible.value = false
}
//关闭弹框
const cancelDialog = (type) => {
    if (type == 1) exportDialogVisible.value = false
    else if (type == 2) superiorDialogVisible.value = false
    else managerPwdDialogVisible.value = false
}
//密码输入完成
const handleManagerPwd = (boo, pwd) => {
    if (pwd) {
        superiorDialogVisible.value = false
        exportSubmit(pwd)
    }
}
//定义导出参数
const props=defineProps({
    myProp: {
        type: String,
        required: true
    }
});
//页面初始化
const pageInit=()=>{
    if (queryParams.value.date.length > 0) {
        queryParams.value.startTime = queryParams.value.date[0] + ' 00:00:00';
        queryParams.value.endTime = queryParams.value.date[1] + ' 23:59:59';
    }
    queryParams.value.userId = props.myProp;
    queryParams.value.status = 0;
    getZUserAuditLogInfo(queryParams.value).then((res)=>{
        tableData.value = res.rows
        total.value = res.total
    });
}
pageInit();
</script>
<style lang="scss" scoped></style>
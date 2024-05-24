<template>
    <div class="app-container">
        <!-- 查询条件 -->
        <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <el-form class="queryForm" :model="queryParams" ref="queryRef" :inline="true"
                :label-width="publicConfigStore.formLabel120">

                <template v-for="(item, index) in disabledPeopleLogQuery" :key="index">
                    <el-form-item :label="item.name">
                        <!-- 文本框 -->
                        <el-input v-if="item.type == 'input'" v-model="queryParams[item.prop]"
                            :placeholder="item.placeholder" clearable @keyup.enter="handleQuery" />

                        <!-- 下拉选择 -->
                        <el-select v-if="item.type == 'select'" v-model="queryParams[item.prop]"
                            :placeholder="item.placeholder" clearable>
                            <el-option v-for="dict in dictData[item.dict]" :key="dict.value" :label="dict.label"
                                :value="dict.value" />
                        </el-select>
                        <!-- 单个日期选择 -->
                        <el-date-picker v-if="item.type == 'date'" v-model="queryParams[item.prop]" type="date"
                            :placeholder="item.placeholder" value-format="YYYY-MM-DD" />
                        <!-- 时间段 日期选择 -->
                        <el-date-picker v-if="item.type == 'datetimerange'" v-model="queryParams[item.prop]"
                            value-format="YYYY-MM-DD" type="daterange" range-separator="-" start-placeholder="开始日期"
                            end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                </template>
                <!-- 操作按钮 -->
                <div class="btn-operate">
                    <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>

                    <el-button icon="Refresh" @click="resetQuery">重置</el-button>
                </div>

            </el-form>
        </el-card>

        <!-- 表格内容 -->
        <el-card :shadow="publicConfigStore.cardShadow">
            <div class="table-total">
                <div>共 <span class="count">{{ total }}</span> 条数据</div>
                <div>
                    <el-button type="primary" class="export" @click="handleExport(true)">导出</el-button>
                </div>
            </div>
            <el-table :data="tableData" border style="width: 100%" :stripe="publicConfigStore.tableStripe"
                :align="publicConfigStore.tableAlign" :header-cell-style="{
            background: publicConfigStore.tableHeaderBg,
            color: publicConfigStore.color333,
            fontWeight: publicConfigStore.tableHeaderBold,
            fontSize: publicConfigStore.tableHeaderFont
        }">
                <el-table-column type="index" label="序号" :width="publicConfigStore.tableIndexWidth" />
                <el-table-column v-for="(item, index) in disabledPeopleLogTable" :key="index" :label="item.name"
                    :show-overflow-tooltip="true" :prop="item.prop" :align="publicConfigStore.tableAlign"
                    :min-width="item.width">
                    <template #default="scope">
                        <span v-if="item.type == 'input'">
                            {{ scope.row[item.prop] }}
                        </span>
                        <span v-if="item.type == 'select'">
                            <dict-tag :options="dictData[item.dict]" :value="scope.row[item.prop]" />
                        </span>

                    </template>
                </el-table-column>


            </el-table>
            <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
                v-model:limit="queryParams.pageSize" @pagination="getList" />
        </el-card>
        <!-- 导出 -->
        <exportDialog :dialogVisible="exportDialogVisible" introduce="按导入时间导出用户" @closes="handleExportFinash" @cancel="cancelDialog"></exportDialog>
        <!-- 上级审核人 -->
        <SuperiorDialog :dialogVisible="superiorDialogVisible" @closes="handleSuperior" @cancel="cancelDialog" :title="titleDialog">
        </SuperiorDialog>
        <!-- 审核密码 -->
        <ManagerPwdDialog :dialogVisible="managerPwdDialogVisible" @closes="handleManagerPwd" @cancel="cancelDialog"></ManagerPwdDialog>
    </div>
</template>
<script setup name="Customer">
import {
    publicConfigStore
} from '@/store/modules/publicConfig'
const {
    proxy
} = getCurrentInstance();
import { getlogList} from "@/api/system/customer";
const router = useRouter();
import {
    disabledPeopleLogQuery,
    disabledPeopleLogTable
} from '../data/index.js'
import { ref } from 'vue';

const { sys_authentication } = proxy.useDict("sys_authentication");
//页面中用到的字典数据
const dictData = ref({
    sys_authentication: sys_authentication
})
//查询表单
const queryParams = ref({
    pageNum: 1,
    pageSize: 10
});
//数据列表
const tableData = ref([]);
const total = ref(0);


//当前选中的导出时间
const exportDate = ref([])
//弹框标题
const titleDialog = ref('导出');
//审核人
const superiorName = ref('')
//导出弹框
const exportDialogVisible = ref(false)
//上级审核弹框
const superiorDialogVisible = ref(false)
//输入密码弹框
const managerPwdDialogVisible = ref(false)


//查询 列表数据
const getList = () => {
    getlogList(queryParams.value).then((res) => {
        tableData.value = res.rows
        total.value = res.total
    })
}
//点击 查询 按钮
const handleQuery = () => {
    queryParams.value.pageNum = 1
    queryParams.value.pageSize = 10
    getList()
}
//点击 重置 按钮
const resetQuery = () => {
    Object.keys(queryParams.value).forEach((item) => {
        if (
            item !== "pageNum" &&
            item !== "pageSize"
        ) {
            queryParams.value[item] = "";
        }
        queryParams.value.pageNum = 1;
        queryParams.value.pageSize = 10;
    });
    handleQuery();
}
getList()

//点击 导出
const handleExport = (boo)=>{
    exportDialogVisible.value = boo
}
//确认导出之后
const handleExportFinash = (boo, date) => {
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
const cancelDialog = (type)=>{
	if(type == 1) exportDialogVisible.value = false
	else if(type == 2) superiorDialogVisible.value = false
	else managerPwdDialogVisible.value = false
}
//密码输入完成
const handleManagerPwd = (boo, pwd) => {
    
    if (pwd) {
        superiorDialogVisible.value = false
        //导出日志
        exportSubmit(pwd)
    }
   
}
//提交导出
const exportSubmit =  async (pwd) => {
    let obj = JSON.parse(JSON.stringify(queryParams.value))
    obj.auditPassword = pwd
    debugger
    obj.leaderName = superiorName.value
    obj.startTime = exportDate.value[0]
    obj.endTime = exportDate.value[1]
	
  await  proxy.download("/dis/log/export", obj,`user_${new Date().getTime()}.xlsx`);
    managerPwdDialogVisible.value = false
}
</script>
<style lang="scss" scoped></style>
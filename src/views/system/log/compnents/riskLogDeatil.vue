<template>
    <div class="app-container">
        <!-- 查询条件 -->
        <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <el-form class="queryForm" :model="queryParams" ref="queryRef" :inline="true"
                :label-width="publicConfigStore.formLabel120">
                <el-form-item label="时间段查询：">
                    <!-- 时间段 日期选择 -->
                    <el-date-picker v-model="queryParams.date" value-format="YYYY-MM-DD" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
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
                <el-button type="primary" class="export" @click="handleExport(true)">导出</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange"
                :stripe="publicConfigStore.tableStripe" :align="publicConfigStore.tableAlign" :header-cell-style="{
            background: publicConfigStore.tableHeaderBg,
            color: publicConfigStore.color333,
            fontWeight: publicConfigStore.tableHeaderBold,
            fontSize: publicConfigStore.tableHeaderFont
        }">
                <el-table-column type="index" label="序号" :width="publicConfigStore.tableIndexWidth" />
                <el-table-column label="操作员" :show-overflow-tooltip="true" prop="userName"
                    :align="publicConfigStore.tableAlign"></el-table-column>
                <el-table-column label="记录时间" :show-overflow-tooltip="true" prop="countTime"
                    :align="publicConfigStore.tableAlign"></el-table-column>


                    <el-table-column :label="selectTotal" :show-overflow-tooltip="true" prop="MONTH"
                        :align="publicConfigStore.tableAlign" min-width='150px'>
                        <template #default="scope">
                            <div class="tag-dict">
                                <span :class="[scope.row.selectIsBig ? 'red' : '']">
                                
                                    {{ scope.row.selectNum }}次{{scope.row.selectIsBig ? '(超过阈值)' : '' }}
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="updateTotal" :show-overflow-tooltip="true" prop="MONTH"
                        :align="publicConfigStore.tableAlign" min-width='150px'>
                        <template #default="scope">
                            <div class="tag-dict">
                                <span :class="[scope.row.updateIsBig ? 'red' : '']">
                                
                                    {{ scope.row.updateNum }}次{{scope.row.updateIsBig ? '(超过阈值)' : '' }}
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="deleteTotal" :show-overflow-tooltip="true" prop="MONTH"
                        :align="publicConfigStore.tableAlign" min-width='150px'>
                        <template #default="scope">
                            <div class="tag-dict">
                                <span :class="[scope.row.deleteIsBig ? 'red' : '']">
                                
                                    {{ scope.row.deleteNum }}次{{scope.row.deleteIsBig ? '(超过阈值)' : '' }}
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="exportTotal" :show-overflow-tooltip="true" prop="MONTH"
                        :align="publicConfigStore.tableAlign" min-width='150px'>
                        <template #default="scope">
                            <div class="tag-dict">
                                <span :class="[scope.row.exportIsBig ? 'red' : '']">
                                
                                    {{ scope.row.exportNum }}次{{scope.row.exportIsBig ? '(超过阈值)' : '' }}
                                </span>
                            </div>
                        </template>
                    </el-table-column>


            </el-table>
            <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNo"
                v-model:limit="queryParams.pageSize" @pagination="getList" />
        </el-card>
        <!-- 导出 -->
        <exportDialog :dialogVisible="exportDialogVisible" introduce="按用户操作时间导出" @closes="handleExportFinash"
            @cancel="cancelDialog"></exportDialog>
        <!-- 上级审核人 -->
        <SuperiorDialog :dialogVisible="superiorDialogVisible" @closes="handleSuperior" @cancel="cancelDialog"
            :title="titleDialog">
        </SuperiorDialog>
        <!-- 审核密码 -->
        <ManagerPwdDialog :dialogVisible="managerPwdDialogVisible" @closes="handleManagerPwd" @cancel="cancelDialog">
        </ManagerPwdDialog>
    </div>
</template>
<script setup name="Customer">
import {
    publicConfigStore
} from '@/store/modules/publicConfig'
const {
    proxy
} = getCurrentInstance();

import { getWarnDetailList,getWarnDetailCount } from "@/api/system/log";
import {
    useRoute
} from 'vue-router'
const route = useRoute();
import { ref } from 'vue';
const { sys_authentication, sys_common_status, sys_oper_type } = proxy.useDict("sys_authentication", "sys_common_status", "sys_oper_type");
//页面中用到的字典数据
const dictData = ref({
    sys_authentication: sys_authentication,
    sys_common_status: sys_common_status,
    sys_oper_type: sys_oper_type
})
//查询表单
const queryParams = ref({
    date: [],
    pageNum: 1,
    pageSize: 10
});
//数据列表
const tableData = ref([]);
const total = ref(0);
//表头统计
const selectTotal = ref('查询操作次数');
const updateTotal = ref('修改操作次数');
const deleteTotal = ref('删除操作次数');
const exportTotal = ref('导出操作次数');
//当前选中的导出时间
const exportDate = ref([])

//操作步骤 1==删除 2==导出
const typeSelect = ref(0)
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


//查询 列表数据
const getList = () => {
    if (queryParams.value.date.length > 0) {
        queryParams.value.startTime = queryParams.value.date[0] + ' 00:00:00'
        queryParams.value.endTime = queryParams.value.date[1] + ' 23:59:59'
    }
    getWarnDetailList(queryParams.value).then((res) => {
        tableData.value = res.rows
        total.value = res.total
      
    })
    getWarnDetailCount(queryParams.value).then((res) => {
        if(res===undefined) return;
        res=res.data;
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].businessType==2)
            if (res[i].businessType == 2) {
                updateTotal.value="修改操作次数（共"+res[i].count+"次）";
            }
            else if (res[i].businessType == 3) {

                deleteTotal.value="删除操作次数（共"+res[i].count+"次）";
            }
            else if (res[i].businessType == 5) {
                exportTotal.value="导出操作次数（共"+res[i].count+"次）";
            }
            else if (res[i].businessType == 10) {
                selectTotal.value="查询操作次数（共"+res[i].count+"次）";
            }
        }
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
    queryParams.value.pageNum = 1;
    queryParams.value.pageSize = 10;
    queryParams.value.date = []
    handleQuery();
}
//点击 删除 按钮
const handleDel = () => {
    proxy.$modal
        .confirm('确认删除?')
        .then(function () {

        })
        .catch(() => { });
}
//点击 修改和详情 1==详情 2==修改
const handleMeg = (row, type) => {
    router.push({
        path: "/customer/customerEdit",
        query: {
            id: 1,
            type: type
        }
    })
}
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

//提交导出
const exportSubmit = async (pwd) => {
    let obj = JSON.parse(JSON.stringify(queryParams.value))
    obj.auditPassword = pwd
    obj.leaderName = superiorName.value
    obj.startTime = exportDate.value[0]
    obj.endTime = exportDate.value[1]

    proxy.download("monitor/operlog/export", obj, `config_${new Date().getTime()}.xlsx`);
}
//选中
const handleSelectionChange = () => {

}
if (route.query && route.query.userId) {
    queryParams.value.userId = route.query.userId
    queryParams.value.name = route.query.name
    getList()
}
</script>
<style lang="scss" scoped></style>
<template>
    <div class="app-container">
        <!-- 查询条件 -->
        <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <el-form class="queryForm" :model="queryParams" ref="queryRef" :inline="true"
                :label-width="publicConfigStore.formLabel120">

                <template v-for="(item, index) in dictQuery" :key="index">
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
                <el-button type="primary" class="export" @click="handleExport(true)">导出</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" :stripe="publicConfigStore.tableStripe"
                :align="publicConfigStore.tableAlign" :header-cell-style="{
            background: publicConfigStore.tableHeaderBg,
            color: publicConfigStore.color333,
            fontWeight: publicConfigStore.tableHeaderBold,
            fontSize: publicConfigStore.tableHeaderFont
        }">
                <el-table-column type="index" label="序号" :width="publicConfigStore.tableIndexWidth" />
                <el-table-column v-for="(item, index) in dictTable" :key="index" :label="item.name"
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

                <el-table-column label="操作" :align="publicConfigStore.tableAlign" class-name="small-padding fixed-width"
                    fixed="right" width="180px">
                    <template #default="scope">

                        <div class="table-caozuo">
                            <span @click="handleMeg(scope.row, 1)">详情</span>
                            <span @click="handleMeg(scope.row, 2)">修改</span>
                            <span @click="handleDel(scope.row)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNo"
                v-model:limit="queryParams.pageSize" @pagination="getList" />
        </el-card>
        <!-- 导出 -->
        <exportDialog :dialogVisible="exportDialogVisible" introduce="按用户创建时间导出用户" @closes="handleExportFinash" @cancel="cancelDialog"></exportDialog>
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
const router = useRouter();
import {
    dictQuery,
    dictTable
} from './data/index.js'
import { getUserList, deleteUser} from "@/api/system/customer";
import { ref } from 'vue';

const { police_status, user_type,reset_status } = proxy.useDict("police_status", "user_type","reset_status");
//页面中用到的字典数据
const dictData = ref({
    police_status: police_status,
    user_type: user_type,
	reset_status:reset_status
})
//查询表单
const queryParams = ref({
    pageNum: 1,
    pageSize: 10
});
//数据列表
const tableData = ref([]);
const total = ref(0);
//当前选中的数据
const rowSelect = ref({})
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
    getUserList(queryParams.value).then((res) => {
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

//点击 删除 按钮
const handleDel = (row) => {
    proxy.$modal
        .confirm('删除需要管理员进行审核，是否确认申请删除?')
        .then(function () {

            titleDialog.value = '删除'
            typeSelect.value = 1
            rowSelect.value = row
            superiorDialogVisible.value = true
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
const cancelDialog = (type)=>{
	if(type == 1) exportDialogVisible.value = false
	else if(type == 2) superiorDialogVisible.value = false
	else managerPwdDialogVisible.value = false
}
//密码输入完成
const handleManagerPwd = (boo, pwd) => {
    
    if (pwd) {
        superiorDialogVisible.value = false
        //删除
        if (typeSelect.value == 1) delSubmit(pwd)
        //导出
        if (typeSelect.value == 2) exportSubmit(pwd)
    }
   
}
//提交删除
const delSubmit = async (pwd) => {
    const res = await deleteUser({ auditPassword: pwd, leaderName: superiorName.value, id: rowSelect.value.id })
    if (res.code == 200) {
		 managerPwdDialogVisible.value = false
		getList()
	}
}
//提交导出
const exportSubmit =  async (pwd) => {
    let obj = JSON.parse(JSON.stringify(queryParams.value))
    obj.auditPassword = pwd
    obj.startTime = exportDate.value[0]
    obj.endTime = exportDate.value[1]
	
    proxy.download("zuser/export", obj,`user_${new Date().getTime()}.xlsx`);
}
getList()
</script>
<style lang="scss" scoped></style>
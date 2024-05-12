<template>
    <div class="app-container">
        <!-- 查询条件 -->
        <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <el-form class="queryForm" :model="queryParams" ref="queryRef" :inline="true"
                :label-width="publicConfigStore.formLabel120">

                <el-form-item label="操作类型：">
                        <!-- 下拉选择 -->
                        <el-select  v-model="queryParams.operType"
                            placeholder="请选择" clearable>
                            <el-option v-for="dict in dictData['oper_type']" :key="dict.value" :label="dict.label"
                                :value="dict.value" />
                        </el-select>
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
                <el-button  type="primary" class="export" @click="handleExport(true)">导出</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%"  :stripe="publicConfigStore.tableStripe"
                :align="publicConfigStore.tableAlign" :header-cell-style="{
            background: publicConfigStore.tableHeaderBg,
            color: publicConfigStore.color333,
            fontWeight: publicConfigStore.tableHeaderBold,
            fontSize: publicConfigStore.tableHeaderFont
        }">
                <el-table-column label="序号" :width="publicConfigStore.tableIndexWidth" />
                <el-table-column v-for="(item, index) in pwdLogTable" :key="index" :label="item.name"
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
import { getKeysLogList,reshPwd} from "@/api/system/pwd";
const router = useRouter();
import {
    pwdLogTable
} from '../data/index.js'
import { ref } from 'vue';
const { sys_authentication,oper_type } = proxy.useDict("sys_authentication","oper_type");
//页面中用到的字典数据
const dictData = ref({
    sys_authentication: sys_authentication,
	oper_type:oper_type
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
	
getKeysLogList(queryParams.value).then((res) => {
        tableData.value = res.rows
        total.value = res.total
    })
}
//点击 查询 按钮
const handleQuery = () => {

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
        
        //导出
        if (typeSelect.value == 2) exportSubmit(pwd)
    }
   
}

//提交导出
const exportSubmit =  async (pwd) => {
    let obj = JSON.parse(JSON.stringify(queryParams.value))
    obj.auditPassword = pwd
    obj.leaderName = superiorName.value
    obj.startTime = exportDate.value[0]
    obj.endTime = exportDate.value[1]
	
    proxy.download("/keys/log/export", obj,`log_${new Date().getTime()}.xlsx`);
	managerPwdDialogVisible.value = false
}
getList()
</script><style lang="scss" scoped>
@import url('../data/compnents.scss');
</style>
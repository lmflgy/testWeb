<template>
    <div class="app-container">
        <!-- 查询条件 -->
        <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <el-form class="queryForm" :model="queryParams" ref="queryRef" :inline="true"
                :label-width="publicConfigStore.formLabel120">

                <template v-for="(item, index) in disabledPeopleQuery" :key="index">
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
                <div style="display: flex;">
                    <!-- <el-button type="primary" class="export">导入</el-button> -->
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl"
                        :limit="1"
                        :before-upload="handleBeforeUpload"
                        :on-success="handleSuccess"
                        ref="uplaodLog"
                    >
                        <el-button type="primary">导入</el-button>
                    </el-upload>
                    <el-button type="primary" class="export mar20" @click="handleLog">导入日志</el-button>
                    <!-- <el-button type="primary" class="export" @click="handleExport(true)">导出</el-button> -->
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
                <el-table-column v-for="(item, index) in disabledPeopleTable" :key="index" :label="item.name"
                    :show-overflow-tooltip="true" :prop="item.prop" :align="publicConfigStore.tableAlign"
                    :min-width="item.width">
                    <template #default="scope">
                        <span v-if="item.type == 'input'">
                            {{ scope.row[item.prop] }}
                        </span>
                        <span v-if="item.type == 'select'">
                            <dict-tag :options="dictData[item.dict]" :value="scope.row[item.prop]" />
                        </span>
                        <span v-if="item.type == 'look'" class="blue cur">
                           查看
                        </span>
                    </template>
                </el-table-column>
               
            </el-table>
            <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNo"
                v-model:limit="queryParams.pageSize" @pagination="getList" />
        </el-card>
      
    </div>
</template>
<script setup name="DisabledPeople">
import {
    publicConfigStore
} from '@/store/modules/publicConfig'
const {
    proxy
} = getCurrentInstance();
const router = useRouter();
import { getDisUserList} from "@/api/system/customer";
import {
    disabledPeopleQuery,
    disabledPeopleTable
} from './data/index.js'
import { ref } from 'vue';

const { dis_status,cert_type,dis_user_type } = proxy.useDict("dis_status","cert_type","dis_user_type");
//页面中用到的字典数据
const dictData = ref({
    dis_status: dis_status,
    cert_type:cert_type,
    dis_user_type:dis_user_type
})
//查询表单
const queryParams = ref({
    pageNum: 1,
    pageSize: 10
});
const uploadUrl = ref('/dev-api/dis/importData')
//数据列表
const tableData = ref([]);
const total = ref(0);
//弹框
const exportDialogVisible = ref(false)



//查询 列表数据
const getList = () => {
    getDisUserList(queryParams.value).then((res) => {
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
const handleDel = () => {
    proxy.$modal
        .confirm('确认删除?')
        .then(function () {

        })
        .catch(() => { });
}
//点击 导入日志
const handleLog = ()=>{
    router.push({
        path: "/customer/disabledPeopleLog",
        query: {
            id: 1,
           
        }
    })
}
//点击 修改和详情 1==详情 2==修改
const handleMeg = (row, type) => {
    router.push({
        path: "/customer/disabledPeopleEdit",
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
const handleBeforeUpload = ()=>{
    
}
//上传成功
const handleSuccess = ()=>{
    proxy.$modal.msgSuccess("导入成功");
    proxy.$refs.uplaodLog.clearFiles()
}
getList()
</script>
<style lang="scss" scoped>
.mar20{margin-left: 20px;}
</style>
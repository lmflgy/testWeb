<template>
    <div class="app-container">
        <!-- 查询条件 -->
        <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <el-form class="queryForm" :model="queryParams" ref="queryRef" :inline="true"
                :label-width="publicConfigStore.formLabel120">

                <template v-for="(item, index) in riskQuery" :key="index">
                    <el-form-item :label="item.name">
                        <!-- 文本框 -->
                        <el-input v-if="item.type == 'input'" v-model="queryParams[item.prop]"
                            :placeholder="item.placeholder" clearable @keyup.enter="handleQueryParent" />

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
                    <el-button type="primary" icon="Search" @click="handleQueryParent">搜索</el-button>

                    <el-button icon="Refresh" @click="resetQuery">重置</el-button>
                </div>

            </el-form>
        </el-card>

        <!-- 表格内容 -->
        <el-card :shadow="publicConfigStore.cardShadow">
            <div class="">
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane label="内部系统" name="name1">
                        <risk-out ref="riskOutRef"></risk-out>
                    </el-tab-pane>
                    <el-tab-pane label="外部系统" name="name2">
                        <risk-inside ref="riskInsideRef"></risk-inside>
                    </el-tab-pane>
                    <el-tab-pane label="操作用户" name="name3">
                        <risk-user ref="riskUserRef"></risk-user>
                    </el-tab-pane>
                </el-tabs>
            </div>

        </el-card>

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
    riskQuery,
    riskTable
} from './data/index.js'
import { ref } from 'vue';
// import { getLimitWarnList } from "@/api/system/log";
import RiskOut from './compnents/riskOut.vue'
import RiskInside from './compnents/riskInside.vue'
import RiskUser from './compnents/riskUser.vue'
const { sys_authentication,user_type } = proxy.useDict("sys_authentication","user_type");
//页面中用到的字典数据
const dictData = ref({
    sys_authentication: sys_authentication,
    user_type:user_type
})
const activeName = ref('name1')
//查询表单
const queryParams = ref({
    pageNum: 1,
    pageSize: 10
});
//数据列表
const tableData = ref([]);
const total = ref(0);
//弹框
const exportDialogVisible = ref(false)



//查询 列表数据
const getList = () => {

}
//点击 查询 按钮
const handleQueryParent = () => {
    queryParams.value.pageNum = 1;
    queryParams.value.pageSize = 10;
    if(activeName.value == 'name1') proxy.$refs["riskOutRef"].handleQuery(JSON.parse(JSON.stringify(queryParams.value)));
    if(activeName.value == 'name2') proxy.$refs["riskInsideRef"].handleQuery(JSON.parse(JSON.stringify(queryParams.value)))
    if(activeName.value == 'name3') proxy.$refs["riskUserRef"].handleQuery(JSON.parse(JSON.stringify(queryParams.value)))
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
    handleQueryParent();
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
//选中
const handleSelectionChange = () => {

}
</script>
<style lang="scss" scoped></style>
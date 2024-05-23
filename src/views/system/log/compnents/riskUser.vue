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
            <el-table-column label="操作员" :show-overflow-tooltip="true" prop="userName"
                :align="publicConfigStore.tableAlign"></el-table-column>
            <el-table-column label="本日操作次数" :show-overflow-tooltip="true" prop="TODAY"
                :align="publicConfigStore.tableAlign" min-width='150px'>
                <template #default="scope">
                    <div v-if="scope.row.data!=undefined && Object.keys(scope.row.data).length != 0" class="tag-dict">
                        <span :class="[scope.row.data.TODAY[0].isBig ? 'red' : '']">
                            <dict-tag :options="dictData.sys_oper_type" :value="showType2" />
                            {{ scope.row.data.TODAY[0].value }}次 {{ scope.row.data.TODAY[0].isBig ? '(超过阈值)' : '' }}
                        </span> &nbsp;| &nbsp;
                        <span :class="[scope.row.data.TODAY[1].isBig ? 'red' : '']">
                            <dict-tag :options="dictData.sys_oper_type" :value="showType10" />
                            {{ scope.row.data.TODAY[1].value }}次{{ scope.row.data.TODAY[0].isBig ? '(超过阈值)' : '' }}
                        </span>
                    </div>
                    <div v-else-if="scope.row.data==undefined || Object.keys(scope.row.data).length === 0" class="tag-dict">
                        <span><dict-tag :options="dictData.sys_oper_type" :value="showType2" />0次</span> 
                        &nbsp;| &nbsp;
                        <span><dict-tag :options="dictData.sys_oper_type" :value="showType10" />0次</span> 
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="本周操作次数" :show-overflow-tooltip="true" prop="MONTH"
                :align="publicConfigStore.tableAlign" min-width='150px'>
                <template #default="scope">
                    <div v-if="scope.row.data!=undefined && Object.keys(scope.row.data).length != 0"  class="tag-dict">
                        <span :class="[scope.row.data.WEEK[0].isBig ? 'red' : '']">
                            <dict-tag :options="dictData.sys_oper_type" :value="showType2" />
                            {{ scope.row.data.WEEK[0].value }}次{{ scope.row.data.WEEK[0].isBig ? '(超过阈值)' : '' }}
                        </span> &nbsp;| &nbsp;
                        <span :class="[scope.row.data.WEEK[1].isBig ? 'red' : '']">
                            <dict-tag :options="dictData.sys_oper_type" :value="showType10" />
                            {{ scope.row.data.WEEK[1].value }}次{{ scope.row.data.WEEK[0].isBig ? '(超过阈值)' : '' }}
                        </span>
                    </div>
                    <div v-else-if="scope.row.data==undefined || Object.keys(scope.row.data).length === 0" class="tag-dict">
                        <span><dict-tag :options="dictData.sys_oper_type" :value="showType2" />0次</span> 
                        &nbsp;| &nbsp;
                        <span><dict-tag :options="dictData.sys_oper_type" :value="showType10" />0次</span> 
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="本月操作次数" :show-overflow-tooltip="true" prop="MONTH"
                :align="publicConfigStore.tableAlign" min-width='150px'>
                <template #default="scope">
                    <div  v-if="scope.row.data!=undefined && Object.keys(scope.row.data).length != 0"  class="tag-dict">
                        <span :class="[scope.row.data.MONTH[0].isBig ? 'red' : '']">
                            <dict-tag :options="dictData.sys_oper_type" :value="showType2" />
                            {{ scope.row.data.MONTH[0].value }}次{{ scope.row.data.MONTH[0].isBig ? '(超过阈值)' : '' }}
                        </span> &nbsp;| &nbsp;
                        <span :class="[scope.row.data.MONTH[1].isBig ? 'red' : '']">
                            <dict-tag :options="dictData.sys_oper_type" :value="showType10" />
                            {{ scope.row.data.MONTH[1].value }}次{{ scope.row.data.MONTH[0].isBig ? '(超过阈值)' : '' }}
                        </span>
                    </div>
                    <div v-else-if="scope.row.data==undefined || Object.keys(scope.row.data).length === 0" class="tag-dict">
                        <span><dict-tag :options="dictData.sys_oper_type" :value="showType2" />0次</span> 
                        &nbsp;| &nbsp;
                        <span><dict-tag :options="dictData.sys_oper_type" :value="showType10" />0次</span> 
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="数据来源" :show-overflow-tooltip="true" prop="userName"
                :align="publicConfigStore.tableAlign">
                <template #default="scope">
                    <dict-tag :options="dictData.user_type" :value="scope.row.userType" />
                </template>
            </el-table-column>
            <el-table-column label="风险状态" :show-overflow-tooltip="true" prop="warnLevel"
                :align="publicConfigStore.tableAlign">
                <template #default="scope">
                    <dict-tag :options="dictData.warn_level" :value="scope.row.warnLevel" />
                </template>
            </el-table-column>


            <!-- <el-table-column label="操作" :align="publicConfigStore.tableAlign" class-name="small-padding fixed-width"
                fixed="right" width="100px">
                <template #default="scope">
                    <div class="table-caozuo">
                        <span @click="handleMeg(scope.row, 1)">详情</span>
                    </div>
                </template>
            </el-table-column> -->
        </el-table>
        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNo"
            v-model:limit="queryParams.pageSize" @pagination="getList" />
    </div>
</template>
<script setup>
import { publicConfigStore } from "@/store/modules/publicConfig";
const { proxy } = getCurrentInstance();
const router = useRouter();
import { riskOutQuery, riskOutTable } from "../data/index";
import { ref } from "vue";
import { getWarnListOut } from "@/api/system/log";
const { sys_authentication, warn_level, user_type, sys_oper_type } = proxy.useDict("sys_authentication", "warn_level", "user_type", "sys_oper_type");
//页面中用到的字典数据
const dictData = ref({
    sys_authentication: sys_authentication,
    warn_level: warn_level,
    user_type: user_type,
    sys_oper_type: sys_oper_type
});

//显示操作类型
const showType2=ref(2);
const showType10=ref(10);
//查询表单
const queryParams = ref({
    pageNum: 1,
    pageSize: 10,
});
//数据列表
const tableData = ref([]);
const total = ref(0);


//查询 列表数据
const getList = () => {
    queryParams.value.type=0;//1外部系统 0用户
    getWarnListOut(queryParams.value).then((res) => {
        tableData.value = res.rows;
        total.value = res.total;
    });
};
//点击 查询 按钮
const handleQuery = (params) => {
    queryParams.value.userName = params.userName;
    queryParams.value.userType = params.userType;
    queryParams.value.pageNum = 1;
    queryParams.value.pageSize = 10;
    getList()
};
//点击 重置 按钮
const resetQuery = () => {
    Object.keys(queryParams.value).forEach((item) => {
        if (item !== "pageNum" && item !== "pageSize") {
            queryParams.value[item] = "";
        }
        queryParams.value.pageNum = 1;
        queryParams.value.pageSize = 10;
    });
    handleQuery({});
};

//点击 修改和详情 1==外部详情 2==内部详情
const handleMeg = (row, type) => {
    // router.push({
    //     path: "/log/riskLogDeatil",
    //     query: {
    //         id: 1,
    //         type: 1,
    //         userId:row.userId,
    //         name:row.userName
    //     },
    // });
};
//点击 导出
const handleExport = (boo) => {
    let obj = JSON.parse(JSON.stringify(queryParams.value))

    //proxy.download("zuser/export", obj, `warn_${new Date().getTime()}.xlsx`);
};
//选中
const handleSelectionChange = () => { };
//将子组件的方法暴露出去供父组件调用
defineExpose({
    handleQuery,
    resetQuery
})
getList();
</script>
<style lang="scss" scoped>
.tab-con {
    padding: 20px 0;

}

:deep(.el-tag) {
    margin-right: 0px;
    background: none !important;
    border: none;
    padding: 0;
    color: #333;
}

:deep(.red .el-tag) {
    color: red;
}

.tag-dict {
    display: flex;

    span {
        display: flex;
    }
}
</style>

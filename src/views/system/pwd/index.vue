<template>
    <div class="app-container">
     

        <!-- 表格内容 -->
        <el-card :shadow="publicConfigStore.cardShadow">
            <div class="table-total">
                <div>共 <span class="count">{{ total }}</span> 条数据</div>
                <el-button type="primary" @click="handleMeg({},2)">新增规则</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange" :stripe="publicConfigStore.tableStripe"
                :align="publicConfigStore.tableAlign" :header-cell-style="{
            background: publicConfigStore.tableHeaderBg,
            color: publicConfigStore.color333,
            fontWeight: publicConfigStore.tableHeaderBold,
            fontSize: publicConfigStore.tableHeaderFont
        }">
                <el-table-column type="selection" label="序号" :width="publicConfigStore.tableIndexWidth" />
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
                            <span @click="handleMeg(scope.row,1)">手动刷新密钥</span>
                            <span @click="handleDetail(scope.row)">查看日志</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNo"
                v-model:limit="queryParams.pageSize" @pagination="getList" />
        </el-card>
        <!-- 导出 -->
        <exportDialog :dialogVisible="exportDialogVisible" @close="handleExport"></exportDialog>
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
    dictTable
} from './data/index.js'
import { ref } from 'vue';
import exportDialog from '@/components/exportDialog';
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
const tableData = ref([{}]);
const total = ref(10);
//弹框
const exportDialogVisible = ref(false)



//查询 列表数据
const getList = () => {

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
//点击 删除 按钮
const handleDel = () => {
    proxy.$modal
        .confirm('确认删除?')
        .then(function () {

        })
        .catch(() => { });
}
//点击 修改和详情 1==详情 2==修改
const handleMeg = (row,type) => {
    router.push({
        path: "/pwd/pwdEdit",
        query: {
            id: 1,
            type:type
        }
    })
}
//点击 查看日志
const handleDetail = (row,type) => {
    router.push({
        path: "/pwd/pwdLog",
        query: {
            id: 1
        }
    })
}
//点击 导出
const handleExport = (boo)=>{
    exportDialogVisible.value = boo
}
//选中
const handleSelectionChange = ()=>{

}
</script>
<style lang="scss" scoped></style>
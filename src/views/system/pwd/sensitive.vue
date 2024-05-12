<template>
    <div class="app-container">
        <!-- 查询条件 -->
        <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <el-form class="queryForm" :model="queryParams" ref="queryRef" :inline="true"
                :label-width="publicConfigStore.formLabel120">

                <el-form-item label="名称：">
                    <el-input v-model="queryParams.tableName"
                            placeholder="输入名称" clearable @keyup.enter="getList" />
                    </el-form-item>
                <!-- 操作按钮 -->
                <div class="btn-operate">
                    <el-button type="primary" icon="Search" @click="getList">搜索</el-button>

                    <el-button icon="Refresh" @click="resetQuery">重置</el-button>
                </div>

            </el-form>
        </el-card>

        <!-- 表格内容 -->
        <el-card :shadow="publicConfigStore.cardShadow">
            <div class="table-total">
                <div>共 <span class="count">{{ total }}</span> 条数据</div>
                <!-- <el-button  type="primary" class="export" @click="handleExport(true)">导出</el-button> -->
            </div>
            <el-table :data="tableData" border style="width: 100%"  :stripe="publicConfigStore.tableStripe"
                :align="publicConfigStore.tableAlign" :header-cell-style="{
            background: publicConfigStore.tableHeaderBg,
            color: publicConfigStore.color333,
            fontWeight: publicConfigStore.tableHeaderBold,
            fontSize: publicConfigStore.tableHeaderFont
        }">
                <el-table-column label="序号" :width="publicConfigStore.tableIndexWidth" />
                <el-table-column v-for="(item, index) in sensitiveTable" :key="index" :label="item.name"
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
           <!-- <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNo"
                v-model:limit="queryParams.pageSize" @pagination="getList" /> -->
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
    sensitiveTable
} from './data/index.js'
	import {
		getSensitiveList
	} from "@/api/system/pwd";
import { ref } from 'vue';
const { sys_authentication } = proxy.useDict("sys_authentication");
//页面中用到的字典数据
const dictData = ref({
    sys_authentication: sys_authentication
})
//查询表单
const queryParams = ref({
    
});
//数据列表
const tableData = ref([]);
const total = ref(0);




//查询 列表数据
const getList = () => {
getSensitiveList(queryParams.value).then((res) => {
			tableData.value = res.data
			total.value = res.data.length
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
       
    });
    handleQuery();
}


//点击 导出
const handleExport = (boo)=>{
    exportDialogVisible.value = boo
}
getList()
</script><style lang="scss" scoped>
@import url('./data/compnents.scss');
</style>
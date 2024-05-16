<template>
    <div class="app-container audit-con">
        <div class="four-card">
            <el-card :shadow="publicConfigStore.cardShadow" class="search-cards">
                <div class="title">
                    <b>日志数量统计</b>
                    <div>
                        <el-date-picker v-model="formData.logCountDate" type="date" placeholder="请选择" format="YYYY-MM-DD" :clearable="false"/>
                    </div>
                </div>

                <div>
                    <div id="echarts1" ref="echarts1" style="width: 100%; height: 260px"></div>
                </div>

            </el-card>
            <el-card :shadow="publicConfigStore.cardShadow" class="search-cards">
                <div class="title">
                    <b>入库日志</b>
                    <div>
                        <el-date-picker v-model="formData.addCountDate" type="date" placeholder="请选择" format="YYYY/MM/DD" />
                    </div>
                </div>

                <div>
                    <div id="echarts2" ref="echarts2" style="width: 100%; height: 260px"></div>
                </div>
            </el-card>
            <el-card :shadow="publicConfigStore.cardShadow" class="search-cards">
                <div class="title">
                    <b>平台操作日志</b>
                    <div>

                        <el-date-picker v-model="formData.platCountDate" type="date" placeholder="请选择" format="YYYY/MM/DD" />
                    </div>
                </div>

                <div>
                    <div id="echarts3" ref="echarts3" style="width: 100%; height: 260px"></div>
                </div>
            </el-card>
            <el-card :shadow="publicConfigStore.cardShadow" class="search-cards">
                <div class="title">
                    <b>调用日志</b>
                    <div class="two">
                        <el-select v-model="platLog" placeholder="请选择" clearable>
                            <el-option v-for="dict in dictData.sys_authentication" :key="dict.value" :label="dict.label"
                                :value="dict.value" />
                        </el-select>
                        <el-date-picker v-model="value1" type="date" placeholder="请选择" format="YYYY/MM/DD" />
                    </div>
                </div>

                <div>
                    <div id="echarts4" ref="echarts4" style="width: 100%; height: 260px"></div>
                </div>
            </el-card>
        </div>
        <el-card :shadow="publicConfigStore.cardShadow" class="search-cards ">
            <div class="yujing">
                <div class="left">
                    <div class="title">
                        <b>风险预警</b>
                        <div class="two">
                            <el-select v-model="platLog" placeholder="请选择" clearable>
                                <el-option v-for="dict in dictData.sys_authentication" :key="dict.value"
                                    :label="dict.label" :value="dict.value" />
                            </el-select>

                        </div>
                    </div>

                    <div>
                        <div id="echarts5" ref="echarts5" style="width: 100%; height: 350px"></div>
                    </div>
                </div>
                <div class="right">
                    <div class="title">
                        <span>风险的人员名单</span>
                        <el-button type="primary" class="export" @click="handleExport(true)">导出</el-button>
                    </div>
                    <el-table :data="tableData" border style="width: 100%" :stripe="publicConfigStore.tableStripe"
                        :align="publicConfigStore.tableAlign" :header-cell-style="{
                background: publicConfigStore.tableHeaderBg,
                color: publicConfigStore.color333,
                fontWeight: publicConfigStore.tableHeaderBold,
                fontSize: publicConfigStore.tableHeaderFont
            }">
                        <el-table-column label="序号" type="index" :width="publicConfigStore.tableIndexWidth" />
                        <el-table-column v-for="(item, index) in autitTable" :key="index" :label="item.name"
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
                </div>
            </div>

        </el-card>

         <!-- 上级审核人 -->
         <SuperiorDialog :dialogVisible="superiorDialogVisible" @closes="handleSuperior" @cancel="cancelDialog" :title="titleDialog">
        </SuperiorDialog>
        <!-- 审核密码 -->
        <ManagerPwdDialog :dialogVisible="managerPwdDialogVisible" @closes="handleManagerPwd" @cancel="cancelDialog"></ManagerPwdDialog>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import {
    publicConfigStore
} from '@/store/modules/publicConfig'
const {
    proxy
} = getCurrentInstance();
import { onMounted, onUnmounted } from "vue";
import {
    autitTable
} from './data/index.js'
const router = useRouter();
import { ref } from 'vue';
import { getEchartsCount,getEchartsWarnList,getEchartsAllCount} from "@/api/system/log";
const { sys_authentication,sys_oper_type,user_type,warn_level } = proxy.useDict("sys_authentication","sys_oper_type","user_type","warn_level");
//页面中用到的字典数据
const dictData = ref({
    sys_authentication: sys_authentication,
    warn_level:warn_level,
    user_type:user_type
})
//shuju
const formData = ref({
    logCountDate:proxy.getNowDate(1),//日志数量统计
    addCountDate:proxy.getNowDate(1),//新增操作日志
    platCountDate:proxy.getNowDate(1),//平台操作日志
    echartsArr:['echarts1','echarts2','echarts3','echarts4'],
    myChartArr:['myChart1','myChart2','myChart3','myChart4','myChart5'],
    myChart1:null,
    myChart2:null,
    myChart3:null,
    myChart4:null,
    myChart5:null,
})


//操作步骤 1==删除 2==导出
const typeSelect = ref(0)
//弹框标题
const titleDialog = ref('');
//审核人
const superiorName = ref('')
//上级审核弹框
const superiorDialogVisible = ref(false)
//输入密码弹框
const managerPwdDialogVisible = ref(false)

//平台日志下拉
const platLog = ref('')
const tableData = ref([]);
onMounted(() => {
   
    setTimeout(() => {
        // fenXianEcharts('echarts2', 1)
    }, 2000)
    // setTimeout(()=>{
    //     init('echarts3',3)
    // },3000)
    // setTimeout(()=>{
    //     init('echarts4',4)
    // },4000)
})

const init = (index,data) => {
    formData.value[formData.value.myChartArr[index]] = echarts.init(document.getElementById(formData.value.echartsArr[index]));
    formData.value[formData.value.myChartArr[index]].setOption(
        {
            xAxis: {
                type: 'category',
                data: data[0]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: data[1],
                    type: 'bar',
                    itemStyle: {
                        borderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
                        color: '#3787FF'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter(v) {
                                return v.value;
                            },
                            textStyle: { color: '#3787FF' },
                        },
                    },
                    barWidth: '20'
                }
            ]
        })
}

const fenXianEcharts = () => {
    myChart5.value = echarts.init(document.getElementById('echarts5'));
    myChart5.value.setOption(
        {
            legend: {
                show: true,
            right: '10%',
            top: 2,
            icon: 'rect',
            itemWidth: 10,
            itemHeight: 4,
            textStyle: {
                color: '#1a1a1a',
                fontSize: 12,
            },
            name:['入库日志', '平台操作日志', '第三方调用日志']
  },
            xAxis: {
                type: 'category',
                data: ['入库日志', '平台操作日志', '第三方调用日志']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'入库日志',
                    data: [120, 200, 150],
                    type: 'bar',
                    itemStyle: {
                        borderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
                        color: '#3787FF'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter(v) {
                                return v.value;
                            },
                            textStyle: { color: '#3787FF' },
                        },
                    },
                    barWidth: '20'
                },
                {
                    name:'平台操作日志',
                    data: [120, 200, 150],
                    type: 'bar',
                    itemStyle: {
                        borderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
                        color: '#00D2AC'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter(v) {
                                return v.value;
                            },
                            textStyle: { color: '#00D2AC' },
                        },
                    },
                    barWidth: '20'
                },
                {
                    name:'第三方调用日志',
                    data: [120, 200, 150],
                    type: 'bar',
                    itemStyle: {
                        borderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
                        color: '#FB4D4D'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter(v) {
                                return v.value;
                            },
                            textStyle: { color: '#FB4D4D' },
                        },
                    },
                    barWidth: '20'
                }
            ]
        })

}

//柱状图1 日志数量统计
const getEchartsAllCountData = async()=>{
    const res = await getEchartsAllCount({date:formData.value.logCountDate});
    let dataArr = [[],[]];
    for(let i = 0; i<res.data.length;i++){
       dataArr[0].push(res.data[i].name);
       dataArr[1].push(res.data[i].count);
      
    }


    setTimeout(()=>{
        init(0,dataArr)
    },500);
}


//柱状图2 日志数量统计
const getEchartsAddCountData = async()=>{
    const res = await getEchartsAddCount({date:formData.value.addCountDate});
    let dataArr = [[],[]];
    for(let i = 0; i<res.data.length;i++){
       dataArr[0].push(res.data[i].name)
       dataArr[1].push(res.data[i].count)
    }
    setTimeout(()=>{
        init(0,dataArr)
    },500)
}


//平台操作日志
const getEchartsCountData = async()=>{
    const res = await getEchartsCount({date:formData.value.platCountDate})
    let dataArr = [[],[]]
    for(let i = 0; i<sys_oper_type.value.length;i++){
       let dict = sys_oper_type.value[i]
       dataArr[0].push(dict.label)
       dataArr[1].push(0)
       for(let k = 0; k<res.data.length;k++){
        if(dict.value == res.data[k].businessType)  dataArr[1][dataArr[1].length-1]=(res.data[k].count)
        
       }
    }
    setTimeout(()=>{
        init(2,dataArr)
    },500)
}
//风险人员
const getEchartsDangerPlepeoData = async()=>{
    const res = await getEchartsWarnList({date:proxy.getNowDate(1)})
    tableData.value = res.data
}
//点击 导出
const handleExport = (boo) => {
    superiorDialogVisible.value = boo

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
    exportSubmit(pwd)
}

}

//提交导出
const exportSubmit =  async (pwd) => {
// let obj = JSON.parse(JSON.stringify(queryParams.value))
let obj = {}
obj.auditPassword = pwd
obj.leaderName = superiorName.value

proxy.download("logData/export", obj,`user_danger_${new Date().getTime()}.xlsx`);
managerPwdDialogVisible.value = false
}
//柱状图1  日志数量统计
getEchartsAllCountData();
//柱状图2  入库日志统计
getEchartsAddCountData();
getEchartsCountData();
getEchartsDangerPlepeoData();


</script>
<style lang="scss" scoped>
.audit-con {
    display: flex;
    flex-direction: column;

    .four-card {
        display: flex;
        justify-content: space-between;

        .search-cards {
            width: 25%;
            margin-right: 24px;
            min-width: 300px;
        }
    }

    .search-cards {
        margin-right: 24px;
        min-width: 1200px;

        .title {
            display: flex;
            justify-content: space-between;

            b {
                font-size: 15px;
            }

            ::v-deep .el-input {
                width: 120px;
                height: 27px;
                border-radius: 5px 5px 5px 5px;
            }

            .two {
                display: flex;

                .el-select {
                    margin-right: 10px;
                }
            }
        }

        .yujing {
            display: flex;

            .left {
                flex: 9;
                margin-right: 40px;
            }

            .right {
                flex: 3;

                .title {
                    margin-bottom: 10px;
                }
            }

        }
    }
}
</style>
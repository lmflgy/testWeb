<template>
    <div class="app-container audit-con">
        <div class="four-card">
            <el-card :shadow="publicConfigStore.cardShadow" class="search-cards">
                <div class="title">
                    <b>日志数量统计</b>
                    <div>
                        <el-date-picker v-model="formData.logCountDate" type="date" @change="handelSearch(1)" placeholder="请选择" format="YYYY-MM-DD"   value-format="YYYY-MM-DD" :clearable="false"/>
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
                        <el-date-picker v-model="formData.addCountDate" type="date"  @change="handelSearch(2)" placeholder="请选择" format="YYYY-MM-DD" value-format="YYYY-MM-DD"/>
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

                        <el-date-picker v-model="formData.platCountDate" type="date"  @change="handelSearch(3)" placeholder="请选择" format="YYYY-MM-DD" value-format="YYYY-MM-DD"/>
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
                        <el-select v-model="rpcLog" placeholder="请选择"  @change="handelSearch(4)" clearable>
                            <el-option v-for="dict in dictData.sys_oper_type.filter(x=>x.value==='10' || x.value==='2' || x.value==='3')" :key="dict.value" :label="dict.label"  :value="dict.value" />
                        </el-select>
                        <el-date-picker v-model="formData.rpcCountDate" type="date"  @change="handelSearch(4)" placeholder="请选择" format="YYYY-MM-DD" value-format="YYYY-MM-DD"/>
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
                            <el-select v-model="warnLog"  @change="handelSearch(5)" placeholder="请选择" clearable>
                                <el-option key="0" label="今日" value="0" />  
                                <el-option key="1" label="本周" value="1" />  
                                <el-option key="2" label="本月" value="2" />  
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
import { getEchartsCount,getEchartsWarnList,getEchartsAllCount,getEchartsAddCount,getEchartsRpcCount,getEchartsWarnListData} from "@/api/system/log";
const { sys_authentication,sys_oper_type,user_type,warn_level,echart_oper_type } = proxy.useDict("sys_authentication","sys_oper_type","user_type","warn_level");
//页面中用到的字典数据
const dictData = ref({
    sys_authentication: sys_authentication,
    warn_level:warn_level,
    user_type:user_type,
    sys_oper_type:sys_oper_type
})
//shuju
const formData = ref({
    logCountDate:proxy.getNowDate(1),//日志数量统计
    addCountDate:proxy.getNowDate(1),//新增操作日志
    platCountDate:proxy.getNowDate(1),//平台操作日志
    rpcCountDate:proxy.getNowDate(1),//调用日志
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

//调用日志下拉
const rpcLog = ref('')
//平台日志下拉
const platLog = ref('')
//风险预警
const warnLog = ref('')
const tableData = ref([]);
onMounted(() => {
    console.log(sys_oper_type)
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

const fenXianEcharts = (index,data) => {
    formData.value[formData.value.myChartArr[index]]= echarts.init(document.getElementById('echarts5'));

    let echartSeries=[];
    let echartX=[];
    
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
                    name:'低风险',
                    test:'1',
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
                },
                {
                    name:'中风险',
                    data: data[2],
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
                    name:'高风险',
                    data: data[3],
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
    console.log(formData.value.logCountDate)
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
    //后端无字典接口手动定义
    let dataType=[{1:"残疾人"},{2:"黑名单"}];
    const res = await getEchartsAddCount({date:formData.value.addCountDate});
    let dataArr = [[],[]];
    for(let i = 0; i<res.data.length;i++){
        if(res.data[i].type===1){
            dataArr[0].push('残疾人')
        }
        else if(res.data[i].type===2){
            dataArr[0].push('黑名单')
        }
        else{
            dataArr[0].push('其他')
        }
       dataArr[1].push(res.data[i].count);
    }
    setTimeout(()=>{
        init(1,dataArr)
    },500)
}


//平台操作日志
const getEchartsCountData = async()=>{
    const res = await getEchartsCount({date:formData.value.platCountDate})
    let dataArr = [[],[]]
    for(let i = 0; i<sys_oper_type.value.length;i++){
       let dict = sys_oper_type.value[i]
       let resItem=res.data.find(item => item.businessType.toString() === dict.value.toString());
       dataArr[0].push(dict.label)
       dataArr[1].push(resItem==undefined? 0: resItem.count)
    //    for(let k = 0; k<res.data.length;k++){
    //     if(dict.value == res.data[k].businessType)  dataArr[1][dataArr[1].length-1]=(res.data[k].count)
        
    //    }
    }
    setTimeout(()=>{
        init(2,dataArr)
    },500)
}

//柱状图4 调用日志
const getEchartsRpcCountData = async()=>{
    const res = await getEchartsRpcCount({date:formData.value.rpcCountDate,businessType:rpcLog.value});
    let dataArr = [[],[]];
    for(let i = 0; i<user_type.value.length;i++){
       let dict = user_type.value[i];
       if(dict.value ==="00") continue;
       let resItem=res.data.find(item => item.operatorType === dict.value);
       dataArr[0].push(dict.label)
       dataArr[1].push(resItem==undefined? 0: resItem.operCount)
    }
    setTimeout(()=>{
        init(3,dataArr)
    },500);
}

//柱状图5 风险预警
const getEchartsWarnListDataAsync= async()=>{
    const res = await getEchartsWarnListData({type:2});
    res.data=[{
        "sysName":"00",
        "sysValue":[
            { "warnType":1,"count":10 },
            { "warnType":2,"count":30 },
            { "warnType":3,"count":30 }
        ]
    },
    {
        "sysName":"01",
        "sysValue":[
            { "warnType":1,"count":10 },
            { "warnType":2,"count":21 },
            { "warnType":3,"count":30 }
        ]
    },
    {
        "sysName":"02",
        "sysValue":[
            { "warnType":1,"count":10 },
            { "warnType":2,"count":24 },
            { "warnType":3,"count":30 }
        ]
    },
    {
        "sysName":"03",
        "sysValue":[
            { "warnType":1,"count":11 },
            { "warnType":2,"count":22 },
            { "warnType":3,"count":35 }
        ]
    },
    {
        "sysName":"04",
        "sysValue":[
            { "warnType":1,"count":3 },
            { "warnType":2,"count":27 },
            { "warnType":3,"count":1 }
        ]
    },
    {
        "sysName":"05",
        "sysValue":[
            { "warnType":1,"count":9 },
            { "warnType":2,"count":20 },
            { "warnType":3,"count":0 }
        ]
    }
]
let dataArr = [[],[],[],[]]
    for(let i = 0; i<user_type.value.length;i++){
        let dict = user_type.value[i];
        let resItem=res.data.find(item => item.sysName === dict.value);
        dataArr[0].push(dict.label);
        if(resItem==undefined || resItem.sysValue==undefined)
        {
            dataArr[1].push(0);
            dataArr[2].push(0);
            dataArr[3].push(0);
            continue;
        }
        let resValue=resItem.sysValue;
        for(let k = 0; k<resValue.length;k++){
            if  (resValue[k]==undefined) {
                dataArr[1].push(0);
                dataArr[2].push(0);
                dataArr[3].push(0);
            }else{
                if  (resValue[k].warnType == 1) dataArr[1].push(resValue[k].count);
                if  (resValue[k].warnType == 2) dataArr[2].push(resValue[k].count);
                if  (resValue[k].warnType == 3) dataArr[3].push(resValue[k].count);
            }
        }
    }
    
    setTimeout(()=>{
        fenXianEcharts(4,dataArr)
    },500);
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
const handelSearch=(value)=>{
    if(value == 1){
        //柱状图1  日志数量统计
        getEchartsAllCountData();
    }
    if(value == 2){
        //柱状图2  入库日志统计
        getEchartsAddCountData();
    }
    if(value == 3){
        //柱状图3  调用日志
        getEchartsRpcCountData();
    }
    if(value == 4){
        getEchartsCountData();
    }
    if(value == 5){
        //柱状图5  风险预警
        getEchartsWarnListDataAsync();
    }
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

//初始化下拉选择框默认值
const initSelect = (data) => {
    rpcLog.value='2';
    warnLog.value='0';
}

initSelect();
//柱状图1  日志数量统计
getEchartsAllCountData();
//柱状图2  入库日志统计
getEchartsAddCountData();
//柱状图3  调用日志
getEchartsRpcCountData();
//柱状图5  风险预警
getEchartsWarnListDataAsync();
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
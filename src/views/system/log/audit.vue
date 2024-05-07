<template>
    <div class="app-container audit-con">
        <div class="four-card">
            <el-card :shadow="publicConfigStore.cardShadow" class="search-cards">
                <div class="title">
                    <b>日志数量统计</b>
                    <div>
                        <el-date-picker v-model="value1" type="date" placeholder="请选择" format="YYYY/MM/DD" />
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
                        <el-date-picker v-model="value1" type="date" placeholder="请选择" format="YYYY/MM/DD" />
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

                        <el-date-picker v-model="value1" type="date" placeholder="请选择" format="YYYY/MM/DD" />
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
                        <el-table-column label="序号" :width="publicConfigStore.tableIndexWidth" />
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
import exportDialog from '@/components/exportDialog';
const { sys_authentication } = proxy.useDict("sys_authentication");
//页面中用到的字典数据
const dictData = ref({
    sys_authentication: sys_authentication
})

const value1 = ref('')
const myChart1 = ref(null)
const myChart2 = ref(null)
const myChart3 = ref(null)
const myChart4 = ref(null)
const myChart5 = ref(null)
//平台日志下拉
const platLog = ref('')
onMounted(() => {
    setTimeout(() => {
        init('echarts1', 1)
    }, 1000)
    setTimeout(() => {
        fenXianEcharts('echarts2', 2)
    }, 2000)
    // setTimeout(()=>{
    //     init('echarts3',3)
    // },3000)
    // setTimeout(()=>{
    //     init('echarts4',4)
    // },4000)
})

const init = (name, index) => {
    myChart1.value = echarts.init(document.getElementById(name));
    myChart1.value.setOption(
        {
            xAxis: {
                type: 'category',
                data: ['入库日志', '平台操作日志', '第三方调用日志']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
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
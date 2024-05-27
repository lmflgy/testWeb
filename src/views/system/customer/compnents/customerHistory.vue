<template>
    <div class="history-con">
        <el-steps :active="myProp.length" direction="vertical">
            <el-step  v-for="(item,index) in myProp" :key="item.id" :class="'step-' + index">
                <template #title>
                    <span class="title">{{ item.createTime }}</span>
                </template>
                <template #description>
                    <div class="des">
                        <span class="title">{{ item.auditUser }} 执行
                            <i class="red" v-if="item.operationType==='2'">删除</i> 
                            <i class="red" v-else-if="item.operationType==='1'">修改</i> 
                            <i class="red" v-else-if="item.operationType==='0'">新增</i> 
                            <i class="red" v-else>未知</i> 
                            审核操作</span>
                    </div>
                </template>
            </el-step>
        </el-steps>
    </div>
</template>
<script setup  name="CustomerHistory">
import {
    publicConfigStore
} from '@/store/modules/publicConfig'

import { useRoute } from 'vue-router';
const route = useRoute();
import { ref } from "vue";
//注入请求接口
import { getZUserAuditLogInfo} from "@/api/system/customer";
//页面变量
const form = ref({})
//页面初始化
const pageInit=(user_id)=>{
    getZUserAuditLogInfo({userId:props.myProp,status:0}).then((res)=>{});
}
const props = defineProps({
    myProp: {
        type: Object,
        required: true
    }
});

pageInit();
</script>
<style lang="scss" scoped>
:deep(.el-step .is-vertical .el-step__line) {
    top: 38px;
    bottom: 12px;
    }
.history-con {
    

    .title {
        font-weight: 500;
        font-size: 15px;
        color: #2B2D30;
    }

    .des {
        display: flex;
        flex-direction: column;
        line-height: 26px;
        span {
            color: #000;
        }

        .time {
            font-size: 13px;
            color: #8C8C8C;
        }

        .yijian {
            font-size: 14px;
            color: #2B2D30;
        }
        .red{color: #FB4D4D;font-style: normal;}
        .blue{color: #3787FF;font-style: normal;}
    }
}
</style>

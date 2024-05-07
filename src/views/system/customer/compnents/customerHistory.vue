<template>
    <div class="history-con">
        <el-steps style="height: 500px" :active="1" direction="vertical">
            <el-step>
                <template #title>
                    <span class="title">管理人XXX审批</span>
                </template>
                <template #description>
                    <div class="des">
                        <span class="time">2020-06-16 15:36:12</span>
                        <span class="title">管理人XXX 对 XXX的申请修改操作 进行了 <i class="red">拒绝</i> 操作</span>
                        <span class="yijian">意见：修改过于频繁</span>
                    </div>
                </template>
            </el-step>
            <el-step>
                <template #title>
                    <span class="title">管理人XXX审批</span>
                </template>
                <template #description>
                    <div class="des">
                        <span class="time">2020-06-16 15:36:12</span>
                        <span class="title">管理人XXX 对 XXX的申请修改操作 进行了 <i class="blue">拒绝</i> 操作</span>
                        <span class="yijian">意见：修改过于频繁</span>
                    </div>
                </template>
            </el-step>
            <el-step>
                <template #title>
                    <span class="title">管理人XXX审批</span>
                </template>
                <template #description>
                    <div class="des">
                        <span class="time">2020-06-16 15:36:12</span>
                        <span class="title">管理人XXX 对 XXX的申请修改操作 进行了 <i class="red">拒绝</i> 操作</span>
                        <span class="yijian">意见：修改过于频繁</span>
                    </div>
                </template>
            </el-step>
        </el-steps>
    </div>
</template>
<script stup></script>
<style lang="scss" scoped>
:deep(.el-step.is-vertical .el-step__line) {
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

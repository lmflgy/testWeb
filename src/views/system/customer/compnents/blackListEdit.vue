<template>

    <div class="app-container customer-edit-con">
        <!-- 查询条件 -->
        <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <div class="card-title">黑名单新增</div>
            <div class="step">
                <el-steps style="" :active="active" align-center>
                    <el-step title="新增黑名单"></el-step>
                    <el-step title="进行审核" />
                    <el-step title="审核完成" />
                </el-steps>
            </div>
        </el-card>

        <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <div class="form-content">
                <div class="card-title">黑名单信息</div>
                <el-form ref="dialogRef" :model="form" :label-width="publicConfigStore.formLabel120">

                    <el-row class="row-mar">

                        <el-col :span="8" class="row">
                            <el-form-item label="客户名称：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="证件类型：" prop="name" :rules="[{ required: true, message: '请选择证件类型' }]">
                                <el-select v-model="form.name" clearable>
                                    <el-option v-for="dict in sys_authentication" :key="dict.value" :label="dict.label"
                                        :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="证件号码：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="联系方式：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable :disabled="type == 1 ? true : false" />
                            </el-form-item>

                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="关联类型：" prop="name" :rules="[{ required: true, message: '请选择关联类型' }]">
                                <el-select v-model="form.name" clearable>
                                    <el-option v-for="dict in sys_authentication" :key="dict.value" :label="dict.label"
                                        :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="黑名单类型：" prop="name" :rules="[{ required: true, message: '请选择黑名单类型' }]">
                                <el-select v-model="form.name" clearable>
                                    <el-option v-for="dict in sys_authentication" :key="dict.value" :label="dict.label"
                                        :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="黑名单描述：" prop="name" :rules="[{ required: true, message: '请输入黑名单描述' }]">
                                <el-input v-model="form.name" clearable  />
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                  

                </el-form>
                <div class="btns">
                    <el-button @click="submitForm">取消</el-button>
                    <el-button type="primary" @click="submitForm">保存</el-button>
                </div>
            </div>
        </el-card>
        <!-- 详情进度 -->
        <el-card v-if="type == 1" :shadow="publicConfigStore.cardShadow" class="search-card">
            <div class="">
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane label="审批历史" name="name1">
                        <customer-history></customer-history>
                    </el-tab-pane>
                    <el-tab-pane label="操作日志" name="name2">Config</el-tab-pane>
                    <el-tab-pane label="历史操作日志" name="name3">Role</el-tab-pane>
                </el-tabs>
            </div>
        </el-card>



    </div>
</template>
<script setup name="BlackListEdit">
import {
    publicConfigStore
} from '@/store/modules/publicConfig'
const {
    proxy
} = getCurrentInstance();
import { useRoute } from 'vue-router'
const { sys_authentication } = proxy.useDict("sys_authentication");

import customerHistory from '../compnents/customerHistory.vue';
const route = useRoute();
import CustomerHistory from '../compnents/customerHistory.vue'
//自定义的字段
const active = ref(1)
const form = ref({})
const imgUrl = ref('https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg')
//1详情 2修改
const type = ref(1)
const activeName = ref('name1')

//方法
const submitForm = () => {
    proxy.$refs["dialogRef"].validate(valid => {
        if (valid) {

        }
    })
}
if (route.query && route.query.type) {
    type.value = route.query.type


}
</script>
<style lang="scss" scoped>
@import url('../data/compnents.scss');
</style>
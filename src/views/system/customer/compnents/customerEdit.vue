<template>
    
<div class="app-container customer-edit-con">
        <!-- 查询条件 -->
        <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <div class="card-title">客户个人信息修改流程</div>
            <div class="step">
                <el-steps style="" :active="active" align-center>
                    <el-step title="修改信息"></el-step>
                    <el-step title="进行审核" />
                    <el-step title="审核完成" />
                </el-steps>
            </div>
        </el-card>

        <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <div class="form-content">
                <div class="card-title">客户基础信息</div>
                <el-form ref="dialogRef" :model="form" :label-width="publicConfigStore.formLabel120" >
                    
                    <el-row class="row-mar">
                        <el-col :span="8" class="row">
                            <el-form-item label="客户编号：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable disabled/>
                            </el-form-item>
                            <span>客户编号不可修改</span>
                        </el-col>
                        <el-col :span="12" class="row">
                            <el-form-item label="客户名称：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="证件号码：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="联系方式：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                           
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="户籍地址：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="认证状态：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable disabled />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" class="row">
                            <el-form-item label="认证时间：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable disabled/>
                            </el-form-item>
                            <span>最近一次认证的时间</span>
                        </el-col>
                        <el-col :span="24" class="row">
                            <el-form-item label="认证照片：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                               <!-- <el-image src="/assets/images/login-background.jpg" class="sfz-img"></el-image> -->
                               <el-image :src="imgUrl" class="sfz-img"></el-image>
                               <el-image :src="imgUrl" class="sfz-img"></el-image>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-col :span="24" class="">
                            <div class="card-title">客户基础信息</div>
                        </el-col>
                    <el-row class="row-mar">
                       
                        <el-col :span="8" class="row">
                            <el-form-item label="信息名称：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable disabled/>
                            </el-form-item>
                            <span>不可修改</span>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="信息名称：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="信息名称：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="信息名称：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                           
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="信息名称：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-col :span="24" class="">
                            <div class="card-title">住建部</div>
                        </el-col>
                    <el-row class="row-mar">
                       
                        <el-col :span="8" class="row">
                            <el-form-item label="信息名称：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable disabled/>
                            </el-form-item>
                            <span>不可修改</span>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="信息名称：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="信息名称：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="信息名称：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                           
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="信息名称：" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
                                <el-input v-model="form.name" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="btns">
                    <el-button  @click="submitForm">取消</el-button>
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
<script setup name="CustomerEdit">
import {
    publicConfigStore
} from '@/store/modules/publicConfig'
const {
    proxy
} = getCurrentInstance();
import { useRoute } from 'vue-router'
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
const submitForm =()=>{
    proxy.$refs["dialogRef"].validate(valid => {
        if(valid){

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
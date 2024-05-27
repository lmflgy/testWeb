<template>
    
<div class="app-container customer-edit-con">
        <!-- 查询条件 -->
        <!-- <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <div class="card-title">客户个人信息修改流程</div>
            <div class="step">
                <el-steps style="" :active="active" align-center>
                    <el-step title="修改信息"></el-step>
                    <el-step title="进行审核" />
                    <el-step title="审核完成" />
                </el-steps>
            </div>
        </el-card> -->

        <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <div class="form-content">
                <div class="card-title">客户基础信息</div>
                <el-form ref="dialogRef" :model="form" :label-width="publicConfigStore.formLabel120" >
                    
                    <el-row class="row-mar">
                        <el-col :span="8" class="row">
                            <el-form-item label="客户姓名：" prop="name" :rules="[{ required: true, message: '请输入客户姓名' }]">
                                <el-input v-model="form.name" clearable  :disabled="type==1?true:false"/>
                                <span>不可修改</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" class="row">
                            <el-form-item label="客户电话：" prop="phoneNo" :rules="[{ required: true, message: '请输入客户电话' }]">
                                <el-input v-model="form.phoneNo" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="身份证号：" prop="idNo" :rules="[{ required: true, message: '请输入身份证号' }]">
                                <el-input v-model="form.idNo" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="证件号码：" prop="certNo" :rules="[{ required: true, message: '请输入证件号' }]">
                                <el-input v-model="form.certNo" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="性别：" prop="sex" :rules="[{ required: true, message: '请选择性别' }]">
                                <el-select v-model="form.sex" placeholder="请选择" :disabled="type==1?true:false">
                                    <el-option v-for="dict in sys_user_sex"  :key="dict.value"  :label="dict.label" :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8" class="row">
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
                               <el-image :src="imgUrl" class="sfz-img"></el-image>
                               <el-image :src="imgUrl" class="sfz-img"></el-image>
                            </el-form-item>
                        </el-col> -->
                    </el-row>
                  
                    <el-row class="row-mar" v-if="form.appStatus==='1' && form.yutong!=undefined && form.yutong!=NaN">
                        <el-col :span="24" class="">
                            <div class="card-title">渝通行基础信息</div>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="客户姓名：" prop="yutong_name" :rules="[{ required: true, message: '请输入客户姓名' }]">
                                <el-input v-model="form.yutong.name" clearable  :disabled="type==1?true:false"/>
                                <span>不可修改</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" class="row">
                            <el-form-item label="客户电话：" prop="yutong_phoneNo" :rules="[{ required: true, message: '请输入客户电话' }]">
                                <el-input v-model="form.yutong.phoneNo" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="证件号码：" prop="yutong_certNo" :rules="[{ required: true, message: '请输入证件号' }]">
                                <el-input v-model="form.yutong.certNo" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="性别：" prop="yutong_sex" :rules="[{ required: true, message: '请选择性别' }]">
                                <el-select v-model="form.yutong.sex" placeholder="请选择" :disabled="type==1?true:false">
                                    <el-option v-for="dict in sys_user_sex"  :key="dict.value"  :label="dict.label" :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="年龄：" prop="yutong_age" :rules="[{ required: true, message: '请输入年龄' }]">
                                <el-input v-model="form.yutong.age" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row class="row-mar" v-if="form.consStatus==='1' && form.zhujian!=undefined && form.zhujian!=NaN">
                        <el-col :span="24" class="">
                            <div class="card-title">住建部基础信息</div>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="客户姓名：" prop="zhujian_name" :rules="[{ required: true, message: '请输入客户姓名' }]">
                                <el-input v-model="form.zhujian.name" clearable  :disabled="type==1?true:false"/>
                                <span>不可修改</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" class="row">
                            <el-form-item label="客户电话：" prop="zhujian_phoneNo" :rules="[{ required: true, message: '请输入客户电话' }]">
                                <el-input v-model="form.zhujian.phoneNo" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="证件号码：" prop="zhujian_certNo" :rules="[{ required: true, message: '请输入证件号' }]">
                                <el-input v-model="form.zhujian.certNo" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="性别：" prop="zhujian_sex" :rules="[{ required: true, message: '请选择性别' }]">
                                <el-select v-model="form.zhujian.sex" placeholder="请选择" :disabled="type==1?true:false">
                                    <el-option v-for="dict in sys_user_sex"  :key="dict.value"  :label="dict.label" :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="年龄：" prop="zhujian_age" :rules="[{ required: true, message: '请输入年龄' }]">
                                <el-input v-model="form.zhujian.age" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row class="row-mar" v-if="form.transportStatus==='1' && form.jiaotong!=undefined && form.jiaotong!=NaN">
                        <el-col :span="24" class="">
                            <div class="card-title">交通部基础信息</div>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="客户姓名：" prop="jiaotong_name" :rules="[{ required: true, message: '请输入客户姓名' }]">
                                <el-input v-model="form.jiaotong.name" clearable  :disabled="type==1?true:false"/>
                                <span>不可修改</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" class="row">
                            <el-form-item label="客户电话：" prop="jiaotong_phoneNo" :rules="[{ required: true, message: '请输入客户电话' }]">
                                <el-input v-model="form.jiaotong.phoneNo" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="证件号码：" prop="jiaotong_certNo" :rules="[{ required: true, message: '请输入证件号' }]">
                                <el-input v-model="form.jiaotong.certNo" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="性别：" prop="jiaotong_sex" :rules="[{ required: true, message: '请选择性别' }]">
                                <el-select v-model="form.jiaotong.sex" placeholder="请选择" :disabled="type==1?true:false">
                                    <el-option v-for="dict in sys_user_sex"  :key="dict.value"  :label="dict.label" :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="年龄：" prop="jiaotong_age" :rules="[{ required: true, message: '请输入年龄' }]">
                                <el-input v-model="form.jiaotong.age" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row class="row-mar" v-if="form.ymtStatus==='1' && form.yima!=undefined && form.yima!=NaN">
                        <el-col :span="24" class="">
                            <div class="card-title">一码通基础信息</div>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="客户姓名：" prop="yima_name" :rules="[{ required: true, message: '请输入客户姓名' }]">
                                <el-input v-model="form.yima.name" clearable  :disabled="type==1?true:false"/>
                                <span>不可修改</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" class="row">
                            <el-form-item label="客户电话：" prop="yima_phoneNo" :rules="[{ required: true, message: '请输入客户电话' }]">
                                <el-input v-model="form.yima.phoneNo" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="证件号码：" prop="yima_certNo" :rules="[{ required: true, message: '请输入证件号' }]">
                                <el-input v-model="form.yima.certNo" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="性别：" prop="yima_sex" :rules="[{ required: true, message: '请选择性别' }]">
                                <el-select v-model="form.yima.sex" placeholder="请选择" :disabled="type==1?true:false">
                                    <el-option v-for="dict in sys_user_sex"  :key="dict.value"  :label="dict.label" :value="dict.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="年龄：" prop="yima_age" :rules="[{ required: true, message: '请输入年龄' }]">
                                <el-input v-model="form.yima.age" clearable :disabled="type==1?true:false"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="btns">
                    <el-button  @click="closeForm">取消</el-button>
                    <el-button type="primary" @click="handelSubmitForm">保存</el-button>
                </div>
            </div>
        </el-card>
        <!-- 详情进度 -->
        <el-card v-if="type == 1" :shadow="publicConfigStore.cardShadow" class="search-card">
            <div class="">
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane label="审批历史" name="name1">
                        <customer-history :my-prop="parentData" ref="customerHistoryRef"></customer-history>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="操作日志" name="name2">Config</el-tab-pane> -->
                    <el-tab-pane label="历史操作日志" name="name3">
                        <customer-history-table :my-prop="parenttableData" ref="customerHistoryTableRef"></customer-history-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-card>

        <!-- 上级审核人 -->
        <SuperiorDialog :dialogVisible="superiorDialogVisible" @closes="handleSuperior" @cancel="cancelDialog" :title="titleDialog">
        </SuperiorDialog>
        <!-- 审核密码 -->
        <ManagerPwdDialog :dialogVisible="managerPwdDialogVisible" @closes="handleManagerPwd" @cancel="cancelDialog"></ManagerPwdDialog>
    </div>
</template>
<script setup name="CustomerEdit">
import {
    publicConfigStore
} from '@/store/modules/publicConfig';
const {
    proxy
} = getCurrentInstance();
import useTagsViewStore from '@/store/modules/tagsView';
const visitedViews = computed(() => useTagsViewStore().visitedViews);
import { useRoute } from 'vue-router'
import customerHistory from '../compnents/customerHistory.vue';
const route = useRoute();
import CustomerHistory from '../compnents/customerHistory.vue';
import CustomerHistoryTable from '../compnents/customerHistorytable.vue';
import { getZUserInfo,getZUserAuditLogInfo} from "@/api/system/customer";
const {  sys_user_sex } = proxy.useDict("sys_user_sex");
//自定义的字段
const active = ref(1);
const form = ref({});
const imgUrl = ref('https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg');
//1详情 2修改
const type = ref(1);
const activeName = ref('name1');
const parentData=ref({});
const parenttableData=ref({});

//上级审核弹框;
const superiorDialogVisible = ref(false);
//输入密码弹框
const managerPwdDialogVisible = ref(false);

//选择上级完成
const handleSuperior = (boo, userId) => {
    if (userId) {
        superiorName.value = userId;
        managerPwdDialogVisible.value = true;
    }
    superiorDialogVisible.value = false;
}
//关闭弹框
const cancelDialog = (type)=>{
	if(type == 2) superiorDialogVisible.value = false;
	else managerPwdDialogVisible.value = false;
}
//密码输入完成
const handleManagerPwd = (boo, pwd) => {
    if (pwd) {
        superiorDialogVisible.value = false;
        submitForm(pwd);
    }
}

//方法校验数据并弹出上级审核弹框
const handelSubmitForm =()=>{
     proxy.$refs["dialogRef"].validate(valid => {
        if(valid){
            superiorDialogVisible.value = boo;
        }
    })
}
//提交后台
const submitForm =()=>{
    proxy.$refs["dialogRef"].validate(valid => {
        if(valid){

        }
    })
}

//关闭页面
const  closeForm =()=>{
    const view = {path:'/customer/customerEdit',name: "CustomerEdit"}
    useTagsViewStore().delView(view);
    const latestView = visitedViews.slice(-1)[0];
    if (latestView) {
        router.push(latestView.fullPath);
    } else {
        router.push('/');
    }
}

//页面初始化
const pageInit=()=>{
    if (route.query && route.query.type) {
        type.value = route.query.type;
    }
    let user_id=route.query.id;
    getZUserInfo(user_id).then((res)=>{
        form.value=res.data;
    })
    getZUserAuditLogInfo({userId:user_id,status:0}).then((res)=>{
        parentData.value=res.rows;
    })
}
pageInit();
</script>
<style lang="scss" scoped>
@import url('../data/compnents.scss');
</style>
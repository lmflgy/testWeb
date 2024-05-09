<template>

    <div class="app-container customer-edit-con">
        <!-- 查询条件 -->
       <!-- <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <div class="card-title">黑名单新增</div>
            <div class="step">
                <el-steps style="" :active="active" align-center>
                    <el-step title="新增黑名单"></el-step>
                    <el-step title="进行审核" />
                    <el-step title="审核完成" />
                </el-steps>
            </div>
        </el-card> -->

        <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <div class="form-content">
                <div class="card-title">黑名单信息</div>
                <el-form ref="dialogRef" :model="form" :label-width="publicConfigStore.formLabel120">

                    <el-row class="row-mar">

                        <el-col :span="8" class="row">
                            <el-form-item label="客户名称：" prop="name" :rules="[{ required: true, message: '请输入客户名称' }]">
                                <el-input v-model="form.name" clearable :disabled="type == 3 ? true : false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="证件类型：" prop="certType" :rules="[{ required: true, message: '请选择证件类型' }]">
                                <el-select v-model="form.certType" clearable :disabled="type == 3 ? true : false">
                                    <el-option v-for="dict in cert_type" :key="dict.value" :label="dict.label"
                                        :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="证件号码：" prop="certNo" :rules="[{ required: true, message: '请输入证件号码' }]">
                                <el-input v-model="form.certNo" clearable maxlength="18"  :disabled="type == 3 ? true : false"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="联系方式：" prop="phoneNo" :rules="[{ required: true, message: '请输入联系方式' }]">
                                <el-input v-model="form.phoneNo" clearable :disabled="type == 3 ? true : false" />
                            </el-form-item>

                        </el-col>
                       <!-- <el-col :span="8" class="row">
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
                        </el-col> -->
                        <el-col :span="8" class="row">
                            <el-form-item label="黑名单描述：" prop="remark">
                                <el-input type="textarea" v-model="form.remark" clearable :disabled="type == 3 ? true : false" />
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                  

                </el-form>
                <div class="btns" v-if="type != 3">
                    <el-button @click="submitForm">取消</el-button>
                    <el-button  type="primary" @click="submitForm">{{type==1?'申请':'保存'}}</el-button>
                </div>
            </div>
        </el-card>
        <!-- 详情进度 -->
        <el-card v-if="type == 3" :shadow="publicConfigStore.cardShadow" class="search-card">
            <div class="">
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane label="审批历史" name="name1">
                        <customer-history></customer-history>
                    </el-tab-pane>
                    <el-tab-pane label="操作日志" name="name2">Config</el-tab-pane>
                </el-tabs>
            </div>
        </el-card>

	<!-- 上级审核人 -->
	<SuperiorDialog :dialogVisible="superiorDialogVisible" @closes="handleSuperior" :title="titleDialog" @cancel="cancelDialog">
	</SuperiorDialog>
	<!-- 审核密码 -->
	<ManagerPwdDialog :dialogVisible="managerPwdDialogVisible" @closes="handleManagerPwd" @cancel="cancelDialog"></ManagerPwdDialog>

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
const { sys_authentication,cert_type } = proxy.useDict("sys_authentication","cert_type");

import customerHistory from '../compnents/customerHistory.vue';
const route = useRoute();
import CustomerHistory from '../compnents/customerHistory.vue'

import { updateBlackUser} from "@/api/system/customer";
//自定义的字段
const active = ref(1)
const form = ref({})
//1详情 2修改
const type = ref(1)

//弹框标题
const titleDialog = ref('');
//审核人
const superiorName = ref('')
//上级审核弹框
const superiorDialogVisible = ref(false)
//输入密码弹框
const managerPwdDialogVisible = ref(false)


const activeName = ref('name1')

//方法
const submitForm = () => {
    proxy.$refs["dialogRef"].validate(valid => {
        if (valid) {
			let title = type.value == 1?'申请':'修改'
			proxy.$modal
			    .confirm(`是否确认${title}黑名单?`)
			    .then(function () {
					titleDialog.value=title+'黑名单'
						superiorDialogVisible.value = true
			    })
			    .catch(() => { });
        }
    })
}
//选择上级完成
const handleSuperior = (boo, userId) => {

    if (userId) {
        superiorName.value = userId
        managerPwdDialogVisible.value = true
    }
    superiorDialogVisible.value = false
}
//密码输入完成
const handleManagerPwd = async (boo, pwd) => {
    
    if (pwd) {
        superiorDialogVisible.value = false
		let obj = JSON.parse(JSON.stringify(form.value))
		obj.auditPassword = pwd
		obj.leaderName = superiorName.value
	   const res = await updateBlackUser(obj)
	   if (res.code == 200) {
	   	 managerPwdDialogVisible.value = false
			 proxy.$modal.msgSuccess("修改成功");
	   }
    }

}
//关闭弹框
const cancelDialog = (type)=>{
	if(type == 1) exportDialogVisible.value = false
	else if(type == 2) superiorDialogVisible.value = false
	else managerPwdDialogVisible.value = false
}
if (route.query && route.query.type) {
    type.value = route.query.type
	if(route.query.type !=1){
		form.value = JSON.parse(route.query.data)
	}
}
</script>
<style lang="scss" scoped>
@import url('../data/compnents.scss');
</style>
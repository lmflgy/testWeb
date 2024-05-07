<template>

    <div class="app-container customer-edit-con">
      

        <el-card :shadow="publicConfigStore.cardShadow" class="search-card">
            <div class="form-content">
                <div class="card-title">加密规则新增</div>
                <el-form ref="dialogRef" :model="form" :label-width="publicConfigStore.formLabel120">

                    <el-row class="row-mar">

                      
                        <el-col :span="8" class="row">
                            <el-form-item label="密钥类型：" prop="name" :rules="[{ required: true, message: '请选择证件类型' }]">
                                <el-select v-model="form.name" clearable>
                                    <el-option v-for="dict in sys_authentication" :key="dict.value" :label="dict.label"
                                        :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" class="row">
                            <el-form-item label="作用系统：" prop="name" :rules="[{ required: true, message: '请选择证件类型' }]">
                                <el-select v-model="form.name" clearable>
                                    <el-option v-for="dict in sys_authentication" :key="dict.value" :label="dict.label"
                                        :value="dict.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        
                        <el-col :span="8" class="row">
                            <el-form-item label="有效期：" prop="name" :rules="[{ required: true, message: '请选择关联类型' }]">
                                <el-date-picker v-model="form.time" type="date"
                            value-format="YYYY-MM-DD" />
                            </el-form-item>
                        </el-col>
                       
                       
                        
                    </el-row>
                  

                </el-form>
                <div class="btns">
                    <el-button @click="submitForm">取消</el-button>
                    <el-button type="primary" @click="submitForm">生成密钥</el-button>
                </div>
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

const route = useRoute();
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
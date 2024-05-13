<template>

	<div class="app-container customer-edit-con">


		<el-card :shadow="publicConfigStore.cardShadow" class="search-card">
			<div class="form-content">
				<div class="card-title">加密规则新增</div>
				<el-form ref="dialogRef" :model="form" :label-width="publicConfigStore.formLabel120">

					<el-row class="row-mar">

						<el-col :span="8" class="row">
							<el-form-item label="作用类型：" prop="resetStatus" :rules="[{ required: true, message: '请选择作用类型' }]">
								<el-select v-model="form.resetStatus" clearable>
									<el-option v-for="dict in user_type" :key="dict.value" :label="dict.label"
										:value="dict.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8" class="row">
							<el-form-item label="密钥类型：" prop="type" :rules="[{ required: true, message: '请选择密钥类型' }]">
								<el-select v-model="form.type" clearable>
									<el-option v-for="dict in key_type" :key="dict.value" :label="dict.label"
										:value="dict.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8" class="row">
							<el-form-item label="作用系统：" prop="resetType"
								:rules="[{ required: true, message: '请选择作用系统' }]">
								<el-select v-model="form.resetType" clearable>
									<el-option v-for="dict in reset_type" :key="dict.value" :label="dict.label"
										:value="dict.value" />
								</el-select>
							</el-form-item>
						</el-col>

						<el-col :span="8" class="row">
							<el-form-item label="有效期：" prop="expirationTime" :rules="[{ required: true, message: '请输入有效期' }]">
								<!-- <el-date-picker v-model="form.endTime" type="date" value-format="YYYY-MM-DD" /> -->
								<el-input type="number" v-model="form.expirationTime" clearable />
							</el-form-item>
						</el-col>



					</el-row>


				</el-form>
				<div class="btns">
					<el-button @click="cancelBack">取消</el-button>
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
	import useTagsViewStore from '@/store/modules/tagsView'
	const visitedViews = computed(() => useTagsViewStore().visitedViews);
	const {
		proxy
	} = getCurrentInstance();
	import {
		useRoute
	} from 'vue-router'
	const {
		sys_authentication,
		key_type,
		reset_type,
		user_type
	} = proxy.useDict("sys_authentication", "key_type", "reset_type","user_type");
	import {
		keysAdd
	} from "@/api/system/pwd";
	const route = useRoute();
	const router = useRouter();
	//自定义的字段
	const active = ref(1)
	const form = ref({})
	//1详情 2修改
	const type = ref(1)
	const activeName = ref('name1')

	//方法
	const submitForm = async () => {
		proxy.$refs["dialogRef"].validate(async valid => {
			if (valid) {

				let res = await keysAdd(form.value)
				if (res.code == 200) {
					proxy.$modal.msgSuccess("生成密匙成功");
					cancelBack()
				}
			}
		})
	}
	if (route.query && route.query.type) {
		type.value = route.query.type

	}
	//关闭当前页面
	const cancelBack = () => {
		const view = {
			path: '/pwd/pwdEdit',
			name: "PwdEdit"
		}
		useTagsViewStore().delView(view);
		const latestView = visitedViews.value.slice(-1)[0]
		if (latestView) {
			router.push(latestView.fullPath)
		} else {
			router.push('/')

		}

	}
</script>
<style lang="scss" scoped>
	@import url('../data/compnents.scss');
</style>
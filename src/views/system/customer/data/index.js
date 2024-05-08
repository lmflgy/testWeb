//客户信息表单查询
export const dictQuery = [
	{
	  prop: "name",
	  type: "input",
	  name: "客户名称：",
	  placeholder: "请输入",
	},
	{
	  prop: "certNo",
	  type: "input",
	  name: "客户证件号：",
	  placeholder: "请输入",
	},
	{
	  prop: "policeStatus",
	  type: "select",
	  name: "公安认证状态：",
	  dict: "police_status",
	  placeholder: "请选择",
	},
	{
	  prop: "updateTime",
	  type: "date",
	  name: "更新时间：",
	  placeholder: "请选择",
	},
	{
	  prop: "dataSource",
	  type: "select",
	  name: "信息数据来源：",
	  dict: "user_type",
	  placeholder: "请选择",
	},
  ];
  //客户信息表格显示
  export const dictTable = [
	// {
	//   prop: "name",
	//   type: "input",
	//   name: "客户编号",
	//   placeholder: "请输入",
	//   width: "180px",
	// },
	{
	  prop: "name",
	  type: "input",
	  name: "姓名",
	  placeholder: "请输入",
	  width: "180px",
	},
	// {
	//   prop: "relevanceEpId",
	//   type: "select",
	//   name: "证件类型",
	//   dict: "with_or_without",
	//   placeholder: "请选择",
	//   width: "120px",
	// },
	{
	  prop: "certNo",
	  type: "input",
	  name: "证件号码",
	  placeholder: "请输入",
	  width: "180px",
	},
	{
	  prop: "phoneNo",
	  type: "input",
	  name: "手机号",
	  placeholder: "请输入",
	  width: "180px",
	},
	{
	  prop: "policeStatus",
	  type: "select",
	  name: "公安认证状态",
	  dict: "police_status",
	  placeholder: "请选择",
	  width: "120px",
	},
	{
	  prop: "dataSource",
	  type: "select",
	  name: "数据来源",
	  dict: "user_type",
	  placeholder: "请选择",
	  width: "120px",
	},
	{
	  prop: "createTime",
	  type: "input",
	  name: "创建时间",
	  placeholder: "请输入",
	  width: "120px",
	},
	{
	  prop: "updateTime",
	  type: "input",
	  name: "更新时间",
	  placeholder: "请输入",
	  width: "120px",
	}
  ];

  //残疾人信息管理 表单查询
export const disabledPeopleQuery = [
	{
	  prop: "name",
	  type: "input",
	  name: "客户名称：",
	  placeholder: "请输入",
	},
	{
	  prop: "idNumber",
	  type: "input",
	  name: "客户证件号：",
	  placeholder: "请输入",
	},
	{
	  prop: "relevanceEpId",
	  type: "select",
	  name: "残疾类型：",
	  dict: "sys_authentication",
	  placeholder: "请选择",
	}
  ];
  //残疾人信息管理 表格显示
  export const disabledPeopleTable = [
	{
	  prop: "name",
	  type: "input",
	  name: "客户编号",
	  placeholder: "请输入",
	  width: "180px",
	},
	{
	  prop: "name",
	  type: "input",
	  name: "姓名",
	  placeholder: "请输入",
	  width: "180px",
	},
	// {
	//   prop: "relevanceEpId",
	//   type: "select",
	//   name: "证件类型",
	//   dict: "with_or_without",
	//   placeholder: "请选择",
	//   width: "120px",
	// },
	{
	  prop: "idNumber",
	  type: "input",
	  name: "证件号码",
	  placeholder: "请输入",
	  width: "180px",
	},
	{
		prop: "idNumber",
		type: "input",
		name: "生日",
		placeholder: "请输入",
		width: "180px",
	  },
	  {
		prop: "idNumber",
		type: "input",
		name: "年龄",
		placeholder: "请输入",
		width: "180px",
	  },
	  
	{
	  prop: "phone",
	  type: "input",
	  name: "手机号",
	  placeholder: "请输入",
	  width: "180px",
	},
	{
	  prop: "relevanceEpId",
	  type: "select",
	  name: "残疾类型",
	  dict: "sys_authentication",
	  placeholder: "请选择",
	  width: "120px",
	},
	{
	  prop: "relevanceEpId",
	  type: "dataList",
	  name: "残疾等级",
	  dict: "with_or_without",
	  placeholder: "请选择",
	  width: "120px",
	},
	{
	  prop: "emergencyContact",
	  type: "input",
	  name: "残疾相关证件",
	  placeholder: "请输入",
	  width: "120px",
	},
	{
		prop: "relevanceEpId",
		type: "dataList",
		name: "状态",
		dict: "with_or_without",
		placeholder: "请选择",
		width: "120px",
	  },
  ];

    //残疾人信息管理 导入日志
export const disabledPeopleLogQuery = [
	{
	  prop: "name",
	  type: "input",
	  name: "导入人名称：",
	  placeholder: "请输入",
	},
	
	{
	  prop: "relevanceEpId",
	  type: "select",
	  name: "导入来源：",
	  dict: "sys_authentication",
	  placeholder: "请选择",
	},
	{
		prop: "relevance",
		type: "date",
		name: "导入时间：",
		placeholder: "请选择",
	  },
  ];
  //残疾人信息管理 导入日志表格显示
  export const disabledPeopleLogTable = [
	{
	  prop: "name",
	  type: "input",
	  name: "导入人姓名",
	  placeholder: "请输入",
	  width: "180px",
	},
	
	{
	  prop: "relevanceEpId",
	  type: "select",
	  name: "导入来源",
	  dict: "sys_authentication",
	  placeholder: "请选择",
	  width: "120px",
	},
	{
	  prop: "emergencyContact",
	  type: "input",
	  name: "导入黑名单数量",
	  placeholder: "请输入",
	  width: "180px",
	},
	{
		prop: "emergencyContact",
		type: "input",
		name: "导入时间",
		placeholder: "请输入",
		width: "180px",
	  }
  ];

  //黑名单表单查询
export const backListQuery = [
	{
	  prop: "name",
	  type: "input",
	  name: "客户名称：",
	  placeholder: "请输入",
	},
	{
	  prop: "idNumber",
	  type: "input",
	  name: "证件号码：",
	  placeholder: "请输入",
	},
	{
	  prop: "relevanceEpId",
	  type: "select",
	  name: "客户状态：",
	  dict: "sys_authentication",
	  placeholder: "请选择",
	},
	
	{
	  prop: "relevanceEpId",
	  type: "select",
	  name: "关联类型：",
	  dict: "with_or_without",
	  placeholder: "请选择",
	},
  ];
  //客户信息表格显示
  export const backListTable = [
	{
	  prop: "name",
	  type: "input",
	  name: "客户编号",
	  placeholder: "请输入",
	  width: "180px",
	},
	{
	  prop: "name",
	  type: "input",
	  name: "姓名",
	  placeholder: "请输入",
	  width: "180px",
	},
	// {
	//   prop: "relevanceEpId",
	//   type: "select",
	//   name: "证件类型",
	//   dict: "with_or_without",
	//   placeholder: "请选择",
	//   width: "120px",
	// },
	{
	  prop: "idNumber",
	  type: "input",
	  name: "证件号码",
	  placeholder: "请输入",
	  width: "180px",
	},
	{
	  prop: "phone",
	  type: "input",
	  name: "手机号",
	  placeholder: "请输入",
	  width: "180px",
	},
	{
	  prop: "relevanceEpId",
	  type: "select",
	  name: "关联类型",
	  dict: "sys_authentication",
	  placeholder: "请选择",
	  width: "120px",
	},
	{
	  prop: "relevanceEpId",
	  type: "dataList",
	  name: "黑名单类型",
	  dict: "with_or_without",
	  placeholder: "请选择",
	  width: "120px",
	},
	{
	  prop: "emergencyContact",
	  type: "input",
	  name: "黑名单描述",
	  placeholder: "请输入",
	  width: "120px",
	},
	{
	  prop: "emergencyContact",
	  type: "input",
	  name: "创建人",
	  placeholder: "请输入",
	  width: "120px",
	},
	{
		prop: "relevanceEpId",
		type: "dataList",
		name: "状态",
		dict: "with_or_without",
		placeholder: "请选择",
		width: "120px",
	  },
  ];

  //密钥管理 表格显示
  export const dictTable = [
	
	
	{
	  prop: "type",
	  type: "input",
	  name: "密钥类型",
	//   dict: "sys_authentication",
	  placeholder: "请选择",
	  width: "120px",
	},
	{
	  prop: "resetType",
	  type: "select",
	  name: "作用系统",
	  dict: "reset_type",
	  placeholder: "请输入",
	  width: "180px",
	},
	{
		prop: "expirationTime",
		type: "input",
		name: "有效期",
		placeholder: "请输入",
		width: "180px",
	  },
	  {
		prop: "createTime",
		type: "input",
		name: "新增时间",
		placeholder: "请输入",
		width: "180px",
	  },
	  {
		prop: "name",
		type: "input",
		name: "到期时间",
		placeholder: "请输入",
		width: "180px",
	  },
	  {
		prop: "updateTime",
		type: "input",
		name: "上次刷新时间",
		placeholder: "请输入",
		width: "180px",
	  }
  ];


  //密钥日志 表格显示
  export const pwdLogTable = [
	{
		prop: "name",
		type: "input",
		name: "日期",
		placeholder: "请输入",
		width: "180px",
	  },
	{
		prop: "relevanceEpId",
		type: "select",
		name: "操作类型",
		dict: "sys_authentication",
		placeholder: "请选择",
		width: "120px",
	  },
	
	{
		prop: "relevanceEpId",
		type: "select",
		name: "详细内容",
		dict: "sys_authentication",
		placeholder: "请选择",
		width: "120px",
	  },
	
  ];

  //敏感字段管理 表格显示
  export const sensitiveTable = [
	{
		prop: "name",
		type: "input",
		name: "字段",
		placeholder: "请输入",
		width: "180px",
	  },
	  {
		prop: "name",
		type: "input",
		name: "脱敏说明",
		placeholder: "请输入",
		width: "180px",
	  },
	{
		prop: "relevanceEpId",
		type: "select",
		name: "脱敏位数",
		dict: "sys_authentication",
		placeholder: "请选择",
		width: "120px",
	  },
	{
	  prop: "name",
	  type: "input",
	  name: "实例展示",
	  placeholder: "请输入",
	  width: "180px",
	}
  ];
  //风险预警日志 表单查询
  export const riskQuery = [
	{
		prop: "relevanceEpId",
		type: "select",
		name: "操作员名称：",
		dict: "sys_authentication",
		placeholder: "请选择",
	},
	{
		prop: "relevanceEpId",
		type: "select",
		name: "数据来源：",
		dict: "sys_authentication",
		placeholder: "请选择",
	},
	
  ];
  //风险预警日志 表格显示
  export const riskTable = [
	{
		prop: "name",
		type: "input",
		name: "操作员",
		placeholder: "请输入",
		width: "180px",
	  },
	  {
		prop: "name",
		type: "input",
		name: "本日操作次数",
		placeholder: "请输入",
		width: "180px",
	  },
	{
	  prop: "name",
	  type: "input",
	  name: "本周操作次数",
	  placeholder: "请输入",
	  width: "180px",
	},
	{
		prop: "relevanceEpId",
		type: "select",
		name: "数据来源",
		dict: "sys_authentication",
		placeholder: "请选择",
		width: "120px",
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
		prop: "relevanceEpId",
		type: "select",
		name: "风险状态",
		dict: "sys_authentication",
		placeholder: "请选择",
		width: "120px",
	  }
  ];

  //风险预警日志 表格显示
  export const autitTable = [
	{
		prop: "name",
		type: "input",
		name: "操作员",
		placeholder: "请输入",
		width: "120px",
	  },
	  {
		prop: "relevanceEpId",
		type: "select",
		name: "来源",
		dict: "sys_authentication",
		placeholder: "请选择",
		width: "120px",
	  },
	  {
		prop: "relevanceEpId",
		type: "select",
		name: "风险状态",
		dict: "sys_authentication",
		placeholder: "请选择",
		width: "120px",
	  }
	
  ];

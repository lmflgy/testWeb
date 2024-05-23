//入库日志表单查询
export const dictQuery = [
	{
	  prop: "creater",
	  type: "input",
	  name: "操作员：",
	  placeholder: "请输入操作员",
	},
	{
	  prop: "type",
	  type: "select",
	  name: "操作类型：",
	  dict: "sys_opt_type",
	  placeholder: "请选择",
	},
	{
		prop: "relevance",
		type: "datetimerange",
		name: "时间段查询：",
		placeholder: "请选择",
	  },
  ];
  //入库日志表格显示
  export const dictTable = [
	{
		prop: "creater",
		type: "input",
		name: "操作人员",
		width: "180px",
	  },
	
	{
		prop: "count",
		type: "input",
		name: "操作条数",
		width: "120px",
	  },
	  {
		prop: "type",
		type: "select",
		name: "操作类型",
		dict: "sys_opt_type",
		placeholder: "请选择",
		width: "120px",
	  },
	  {
		prop: "createTime",
		type: "input",
		name: "操作时间",
		width: "180px",
	  }
  ];

  //平台操作日志 表单查询
export const disabledPeopleQuery = [
	{
		prop: "relevanceEpId",
		type: "select",
		name: "类型查询：",
		dict: "sys_authentication",
		placeholder: "请选择",
	},
	{
	  prop: "name",
	  type: "date",
	  name: "时间段查询：",
	  placeholder: "请输入",
	},
	
  ];
  //平台操作日志 表格显示
  export const disabledPeopleTable = [
	{
		prop: "title",
		type: "input",
		name: "数据的来源",
		placeholder: "请选择",
		width: "180px",
	  },
	{
	  prop: "operTime",
	  type: "time",
	  name: "操作时间",
	  placeholder: "请输入",
	  width: "180px",
	},
	{
		prop: "status",
		type: "select",
		name: "操作结果",
		dict: "sys_common_status",
		placeholder: "请选择",
		width: "120px",
	  },
	{
	  prop: "name",
	  type: "input",
	  name: "结果描述",
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
	  prop: "operName",
	  type: "input",
	  name: "操作人",
	  placeholder: "请输入",
	  width: "180px",
	},
	{
		prop: "businessType",
		type: "select",
		name: "操作类型",
		dict: "sys_oper_type",
		placeholder: "请选择",
		width: "120px",
	  },
	{
		prop: "idNumber",
		type: "input",
		name: "日志内容",
		placeholder: "请输入",
		width: "180px",
	  }
  ];

  //三方调用日志 表单查询
  export const threeQuery = [
	{
		prop: "businessType",
		type: "select",
		name: "类型查询：",
		dict: "sys_oper_type_three",
		placeholder: "请选择",
	},{
		prop: "operatorType",
		type: "select",
		name: "系统来源查询：",
		dict: "user_type",
		placeholder: "请选择",
	},
	{
	  prop: "name",
	  type: "datetimerange",
	  name: "时间段查询：",
	  placeholder: "请输入",
	},
	
  ];
  //三方调用日志 表格显示
  export const threeTable = [
	{
		prop: "businessType",
		type: "input",
		name: "操作类型",
		placeholder: "请输入",
		width: "180px",
	  },
	  {
		prop: "count",
		type: "input",
		name: "操作数量",
		placeholder: "请输入",
		width: "180px",
	  },
	{
	  prop: "operName",
	  type: "input",
	  name: "操作员",
	  placeholder: "请输入",
	  width: "180px",
	},
	{
		prop: "operTime",
		type: "time",
		name: "操作时间",
		placeholder: "请输入",
		width: "180px",
	  },
	{
		prop: "operatorType",
		type: "select",
		name: "系统来源",
		dict: "user_type",
		placeholder: "请选择",
		width: "120px",
	  },
	{
	  prop: "tellerld",
	  type: "input",
	  name: "外部系统ID",
	  width: "180px",
	},
	{
		prop: "userId",
		type: "input",
		name: "操作用户ID",
		width: "120px",
	  },
  ];
  //风险预警日志 表单查询
  export const riskQuery = [
	{
		prop: "userName",
		type: "input",
		name: "操作员名称：",
		placeholder: "请选择",
	},
	{
		prop: "userType",
		type: "select",
		name: "数据来源：",
		dict: "user_type",
		placeholder: "请选择",
	},
	
  ];
  //风险预警日志 表格显示
  export const riskTable = [
	{
		prop: "userName",
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
		prop: "name",
		type: "input",
		name: "本月操作次数",
		placeholder: "请输入",
		width: "180px",
	  },
	{
		prop: "userType",
		type: "select",
		name: "数据来源",
		dict: "user_type",
		placeholder: "请选择",
		width: "120px",
	  },
	{
		prop: "warnLevel",
		type: "select",
		name: "风险状态",
		dict: "warn_level",
		placeholder: "请选择",
		width: "120px",
	  }
  ];

  //风险预警日志 表格显示
  export const autitTable = [
	{
		prop: "userName",
		type: "input",
		name: "操作员",
		placeholder: "请输入",
		width: "120px",
	  },
	  {
		prop: "userType",
		type: "select",
		name: "来源",
		dict: "user_type",
		placeholder: "请选择",
		width: "120px",
	  },
	  {
		prop: "warnLevel",
		type: "select",
		name: "风险状态",
		dict: "warn_level",
		placeholder: "请选择",
		width: "120px",
	  }
	
  ];


    //外部系统 表单查询
	export const riskOutQuery = [
		{
			prop: "userName",
			type: "input",
			name: "操作员名称：",
			placeholder: "请选择",
		},
		{
			prop: "userType",
			type: "select",
			name: "数据来源：",
			dict: "user_type",
			placeholder: "请选择",
		},
		
	  ];
	  //外部系统 表格显示
	  export const riskOutTable = [
		{
			prop: "userName",
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
			prop: "name",
			type: "input",
			name: "本月操作次数",
			placeholder: "请输入",
			width: "180px",
		  },
		{
			prop: "userType",
			type: "select",
			name: "数据来源",
			dict: "user_type",
			placeholder: "请选择",
			width: "120px",
		  },
		{
			prop: "warnLevel",
			type: "select",
			name: "风险状态",
			dict: "warn_level",
			placeholder: "请选择",
			width: "120px",
		  }
	  ];
	
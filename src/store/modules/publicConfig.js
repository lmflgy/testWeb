


import { reactive } from 'vue'

export const publicConfigStore = reactive({
  cardShadow: "never", //el-card设置不要阴影
  tableHeaderBg: '#cee7ff', //table头部背景色
  tableHeaderBold: 'normal', //table字体加粗
  tableHeaderFont: '14px', //table字体加粗
  color333: '#5C719D', //字体颜色
  tableStripe: true, //表格是否有斑马线
  formLabel100: '86px', //form label的宽度为100px
  formLabel120: '120px', //form label的宽度为120px
  formLabel130: '130px', //form label的宽度为130px
  formLabel140: '140px', //form label的宽度为140px
  formLabel150: '150px', //form label的宽度为140px
  formLabel180: '180px', //form label的宽度为180px
  formLabel160: '160px', //form label的宽度为160px
  formLabel170: '170px', //form label的宽度为170px
  textDirection: 'top', //鼠标移上去文字显示的方向
  tableIndexWidth: '60', //表格 序号的宽度
  dialogClickBoo: false, //点击遮罩弹框是否关闭弹框
  tableAlign: 'left', //表格内容 居左
  totalCount: 60000, //查询数据总条数
  totalMeg: 'excel导出数据上限为60000条，请按照搜索条件进行分批导出！',//查询数据总条数
  cardShadow: 'never',//开票阴影
  postSource:2//集团等级
})
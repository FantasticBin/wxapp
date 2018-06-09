var staticData = require("../../staticData.js");

export default {
  fundItems:{
    [staticData.default.FUND.HLJH.value]:[
      {
        label: '计算类型',
        prop: 'pType',
        notRender: true,
        value: staticData.default.FUND.HLJH.pType
      },
      {
        label: '起投金额',
        prop: 'startMoney',
        value: 2000,
      },
      {
        label: '起投时间',
        prop: 'startTime',
        value: '2018/4/25',
        disabled: true,
      },
      {
        label: '起投市盈率',
        prop: 'startPB',
        value: '13.28',
        disabled: true,
      },
      {
        label: '当前市盈率',
        prop: 'curPB',
        value: '',
      },
      {
        label: '放大倍数',
        prop: 'multiple',
        value: 1,
      },
    ],
    [staticData.default.FUND.HLETF.value]:[
      {
        label: '起投金额',
        prop: 'startMoney',
        value: 1000
      },
      {
        label: '起投时间',
        prop: 'startMoney',
        value: '2017/9/8'
      },
    ],
  },
  fundList: function(){
    let list = []
    let obj = staticData.default.FUND;
    for (let key in obj){
      list.push(obj[key])
    }
    return list
  }()
}
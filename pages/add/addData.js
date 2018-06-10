var staticData = require("../../staticData.js");

module.exports = {
  fundItems: {
    [staticData.FUND.HLJH.value]: [
      {
        label: '计算类型',
        prop: 'pType',
        notRender: true,
        value: staticData.FUND.HLJH.pType
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
      },
      {
        label: `起投${staticData.FUND.HLJH.pType === staticData.RATE.PY ? '盈收率' : '市盈率'}`,
        prop: 'startPB',
        value: '13.28',
      },
      {
        label: `当前${staticData.FUND.HLJH.pType === staticData.RATE.PY ? '盈收率' : '市盈率'}`,
        prop: 'curPB',
        value: '',
      },
      {
        label: '放大倍数',
        prop: 'multiple',
        value: 1,
      },
    ],
    [staticData.FUND.HLETF.value]: [
      {
        label: '计算类型',
        prop: 'pType',
        notRender: true,
        value: staticData.FUND.HLETF.pType
      },
      {
        label: '起投金额',
        prop: 'startMoney',
        value: 1684,
      },
      {
        label: '起投时间',
        prop: 'startTime',
        value: '2018/4/20',
      },
      {
        label: `起投${staticData.FUND.HLETF.pType === staticData.RATE.PY ? '盈收率' : '市盈率'}`,
        prop: 'startPB',
        value: '12.03',
      },
      {
        label: `当前${staticData.FUND.HLETF.pType === staticData.RATE.PY ? '盈收率' : '市盈率'}`,
        prop: 'curPB',
        value: '',
      },
      {
        label: '当前股价',
        prop: 'curStockPrice',
        value: "",
      },
      {
        label: '放大倍数',
        prop: 'multiple',
        value: 1,
      },
    ],
    [staticData.FUND.AH50.value]: [
      {
        label: '计算类型',
        prop: 'pType',
        notRender: true,
        value: staticData.FUND.AH50.pType
      },
      {
        label: '起投金额',
        prop: 'startMoney',
        value: 1000,
      },
      {
        label: '起投时间',
        prop: 'startTime',
        value: '2017/8/16',
      },
      {
        label: `起投${staticData.FUND.AH50.pType === staticData.RATE.PY ? '盈收率' : '市盈率'}`,
        prop: 'startPB',
        value: '11.21',
      },
      {
        label: `当前${staticData.FUND.AH50.pType === staticData.RATE.PY ? '盈收率' : '市盈率'}`,
        prop: 'curPB',
        value: '',
      },
      {
        label: '放大倍数',
        prop: 'multiple',
        value: 1,
      },
    ],
    [staticData.FUND.ZZHL.value]: [
      {
        label: '计算类型',
        prop: 'pType',
        notRender: true,
        value: staticData.FUND.ZZHL.pType
      },
      {
        label: '起投金额',
        prop: 'startMoney',
        value: 1000,
      },
      {
        label: '起投时间',
        prop: 'startTime',
        value: '2018/3/29',
      },
      {
        label: `起投${staticData.FUND.ZZHL.pType === staticData.RATE.PY ? '盈收率' : '市盈率'}`,
        prop: 'startPB',
        value: '10.74',
      },
      {
        label: `当前${staticData.FUND.ZZHL.pType === staticData.RATE.PY ? '盈收率' : '市盈率'}`,
        prop: 'curPB',
        value: '',
      },
      {
        label: '放大倍数',
        prop: 'multiple',
        value: 1,
      },
    ],
    [staticData.FUND.DBD500.value]: [
      {
        label: '计算类型',
        prop: 'pType',
        notRender: true,
        value: staticData.FUND.DBD500.pType
      },
      {
        label: '起投金额',
        prop: 'startMoney',
        value: 1000,
      },
      {
        label: '起投时间',
        prop: 'startTime',
        value: '2017/11/16',
      },
      {
        label: `起投${staticData.FUND.DBD500.pType === staticData.RATE.PY ? '盈收率' : '市盈率'}`,
        prop: 'startPB',
        value: '26.21',
      },
      {
        label: `当前${staticData.FUND.DBD500.pType === staticData.RATE.PY ? '盈收率' : '市盈率'}`,
        prop: 'curPB',
        value: '',
      },
      {
        label: '放大倍数',
        prop: 'multiple',
        value: 1,
      },
    ],
    [staticData.FUND.JBM50.value]: [
      {
        label: '计算类型',
        prop: 'pType',
        notRender: true,
        value: staticData.FUND.JBM50.pType
      },
      {
        label: '起投金额',
        prop: 'startMoney',
        value: 1000,
      },
      {
        label: '起投时间',
        prop: 'startTime',
        value: '2017/6/5',
      },
      {
        label: `起投${staticData.FUND.JBM50.pType === staticData.RATE.PY ? '盈收率' : '市盈率'}`,
        prop: 'startPB',
        value: '10.01',
      },
      {
        label: `当前${staticData.FUND.JBM50.pType === staticData.RATE.PY ? '盈收率' : '市盈率'}`,
        prop: 'curPB',
        value: '',
      },
      {
        label: '放大倍数',
        prop: 'multiple',
        value: 1,
      },
    ],
    [staticData.FUND.JBM120.value]: [
      {
        label: '计算类型',
        prop: 'pType',
        notRender: true,
        value: staticData.FUND.JBM120.pType
      },
      {
        label: '起投金额',
        prop: 'startMoney',
        value: 1000,
      },
      {
        label: '起投时间',
        prop: 'startTime',
        value: '2018/1/17',
      },
      {
        label: `起投${staticData.FUND.JBM120.pType === staticData.RATE.PY ? '盈收率' : '市盈率'}`,
        prop: 'startPB',
        value: '23.24',
      },
      {
        label: `当前${staticData.FUND.JBM120.pType === staticData.RATE.PY ? '盈收率' : '市盈率'}`,
        prop: 'curPB',
        value: '',
      },
      {
        label: '放大倍数',
        prop: 'multiple',
        value: 1,
      },
    ],
  },
  fundList: function () {
    let list = []
    let obj = staticData.FUND;
    for (let key in obj) {
      list.push(obj[key])
    }
    return list
  }()
}
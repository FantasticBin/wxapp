let rate = {
  PY: 1, //盈利收益率
  PE: 2, //市盈率
  PB: 3  //市净率
}
let fund = {
  HLJH: { name: '红利机会', value: '501029', pType: rate.PE },
  HLETF: { name: '红利ETF', value: '510880', pType: rate.PY },
  AH50: { name: '50AH', value: '501050', pType: rate.PY },
  ZZHL: { name: '中证红利', value: '100032', pType: rate.PY },
  DBD500: { name: '500低波动', value: '003318', pType: rate.PE },
  JBM50: { name: '基本面50', value: '160716', pType: rate.PY },
  JBM120: { name: '基本面120', value: '070023', pType: rate.PE },
  ZGHL: { name: '中国互联', value: '164906', pType: rate.PE },
}
export default {
  RATE: rate,
  FUND: fund,
}
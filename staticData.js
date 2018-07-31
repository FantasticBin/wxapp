const rate = {
  PY: '1', //盈利收益率
  PE: '2', //市盈率
  PB: '3'  //市净率
}
const fundType = {
  OUTER: '1', //场外基金
  INNER: '2', //场内基金
}
module.exports = {
  RATE: rate,
  FUND_TYPE: fundType,
  SELF_FUND_LIST:'self_fund_list',
  SAVED_FUND_LIST:'saved_fund_list',
  ACCESS_TOCKEN:'ACCESS_TOCKEN',
}
// pages/add/add.js
var addData = require("./addData.js");
var staticData = require("../../staticData.js");

Page({
  data: {
    fundArr: [],
    selectArr: [],
    selectIndex: 0,
  },
  onLoad: function (options) {
    this.setData({
      fundArr: addData.default.fundItems['501029'],
      selectArr: addData.default.fundList
    })
  },
  bindKeyInput(e) {
    let prop = e.target.id;
    let value = e.detail.value;
    let newArr = []
    for (const item of this.data.fundArr) {
      if (prop == item.prop) {
        item.value = value
      }
      newArr.push(item)
    }
    this.setData({
      fundArr: newArr,
    })
  },
  bindPickerChange(e) {
    let item = this.data.selectArr[parseInt(e.detail.value)].value
    this.setData({
      selectIndex: e.detail.value,
      fundArr: addData.default.fundItems[item],
    })
  },
  add() {
    let obj = {};
    for (const item of this.data.fundArr) {
      if (item.value) {
        obj[item.prop] = item.value
      } else {
        return
      }
    }
    console.log(obj)
    let startDate = new Date(obj.startTime);
    let curDate = new Date();
    let intervalMonth = (curDate.getFullYear() * 12 + curDate.getMonth()) - (startDate.getFullYear() * 12 + startDate.getMonth());
    let coefficient = Math.pow(1.01, intervalMonth);
    let pby = 0;
    // 如果是盈利收益率
    if (obj.pType === staticData.default.RATE.PY) {
      pby = Math.pow((obj.curPB / obj.startPB), obj.multiple);
    } else {
      pby = Math.pow((obj.startPB / obj.curPB), obj.multiple);
    }
    console.log("coefficient==" + coefficient)
    console.log("pby==" + pby)
    let result = (parseFloat(obj.startMoney) * coefficient * pby).toFixed(0);
    console.log("result==" + result)
  }
})
// pages/add/add.js
var addData = require("./addData.js");
var staticData = require("../../staticData.js");
var utils = require("../../utils/util.js");

Page({
  data: {
    fundArr: [],
    selectArr: [],
    selectIndex: 0,
    curFund: {},
    submitObj: {},
    resultMoney: 0,
    realMoney: 0,
    isOuter: true,//是否场外
    stockCount: '',//场内数量
  },
  onLoad: function (options) {
    this.setData({
      fundArr: addData.fundItems['501029'],
      selectArr: addData.fundList,
      curFund: staticData.FUND.HLJH
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
    let item = this.data.selectArr[parseInt(e.detail.value)]
    let isInner = addData.fundItems[item.value].some(item => {
      return item.prop === 'curStockPrice'
    })
    this.setData({
      selectIndex: e.detail.value,
      curFund: item,
      fundArr: addData.fundItems[item.value],
      submitObj: {},
      resultMoney: 0,
      realMoney: 0,
      isOuter: !isInner,
    })
  },
  calculate() {
    let fundItemObj = {};
    for (const item of this.data.fundArr) {
      if (item.value) {
        fundItemObj[item.prop] = item.value
      } else {
        return
      }
    }
    let startDate = new Date(fundItemObj.startTime);
    let curDate = new Date();
    let intervalMonth = (curDate.getFullYear() * 12 + curDate.getMonth()) - (startDate.getFullYear() * 12 + startDate.getMonth());
    let coefficient = Math.pow(1.01, intervalMonth);
    let pby = 0;
    // 如果是盈利收益率
    if (fundItemObj.pType === staticData.RATE.PY) {
      pby = Math.pow((fundItemObj.curPB / fundItemObj.startPB), fundItemObj.multiple);
    } else {
      pby = Math.pow((fundItemObj.startPB / fundItemObj.curPB), fundItemObj.multiple);
    }
    // let result = (parseFloat(fundItemObj.startMoney) * coefficient * pby).toFixed(0);
    let result = (parseFloat(fundItemObj.startMoney) * pby).toFixed(0);
    if (!isNaN(result)) {
      let real = 0;
      if (this.data.isOuter) {
        let small = result % 100;
        let large = parseInt(result / 100) * 100;
        if (small <= 35) {
          small = 0;
        } else if (small >= 70) {
          small = 100;
        } else {
          small = 50;
        }
        real = large + small;
      } else {
        let count = result / fundItemObj.curStockPrice;
        let small = count % 100;
        let large = parseInt(count / 100) * 100;
        if (small > 50) {
          small = 100;
        } else {
          small = 0;
        }
        real = parseFloat(fundItemObj.curStockPrice) * (large+small)
        this.setData({
          stockCount: large + small
      })
      }
      fundItemObj.resultMoney = real
      fundItemObj.curTime = new Date().getTime().toString();
      fundItemObj.fundName = this.data.curFund.name;
      fundItemObj.fundCode = this.data.curFund.value;
      this.setData({
        resultMoney: result,
        realMoney: real,
        submitObj: fundItemObj,
      })
    }
  },
  add() {
    try {
      let fundItemObj = this.data.submitObj;
      let nowDate = utils.formatTime(new Date()).split(' ')[0]
      let data = wx.getStorageSync(nowDate)
      if (data instanceof Object) {
        data[fundItemObj.fundCode] = fundItemObj
      } else {
        data = {
          [fundItemObj.fundCode]: fundItemObj
        }
      }
      wx.setStorageSync(nowDate, data)
      wx.navigateBack({
        delta: 1
      })
      // wx.redirectTo({
      //   url: '../calculate/calculate'
      // })
    } catch (e) {
      console.log(e)
    }
  }
})
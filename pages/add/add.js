// pages/add/add.js
var AddObj = require("./addData.js");
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
    isOuter: true, //是否场外
    stockCount: '', //场内数量
    isChecked: false,
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '添加定投基金'
    })
    let data = wx.getStorageSync(staticData.SELF_FUND_LIST)
    if (!data) {
      wx.showToast({
        title: '请先添加自选基金',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let tempData = data;
    let tempIndex = 0;
    if (options.index >= 0) {
      tempData = wx.getStorageSync(options.date);
      tempIndex = options.index;
    }
    this.setData({
      fundArr: new AddObj(tempData[tempIndex]),
      selectArr: data,
      curFund: tempData[tempIndex],
      isOuter: tempData[tempIndex].fundType == staticData.FUND_TYPE.OUTER,
      selectIndex: data.findIndex(item => {
        return item.fundCode == tempData[tempIndex].fundCode
      })
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
    this.calculate();
  },
  bindPickerChange(e) {
    let item = this.data.selectArr[parseInt(e.detail.value)]
    this.setData({
      selectIndex: e.detail.value,
      curFund: item,
      fundArr: new AddObj(item),
      submitObj: {},
      resultMoney: 0,
      realMoney: 0,
      isOuter: item.fundType == staticData.FUND_TYPE.OUTER,
      isChecked: false,
    })
  },
  switch2Change(e) {
    this.setData({
      isChecked: e.detail.value
    })
    this.calculate();
  },
  slider2change(e) {
    let value = e.detail.value;
    let newArr = []
    for (const item of this.data.fundArr) {
      if ('multiple' == item.prop) {
        item.value = value
      }
      newArr.push(item)
    }
    this.setData({
      fundArr: newArr,
    })
    this.calculate();
  },
  calculate() {
    let fundItemObj = {};
    for (const item of this.data.fundArr) {
      if (item.value) {
        fundItemObj[item.prop] = item.value
      } else {
        if (!item.notRender) {
          this.setData({
            resultMoney: 0,
            realMoney: 0,
          })
          return
        }
      }
    }
    let startDate = new Date(fundItemObj.startDate.replace(/-/g, '/'));
    let curDate = new Date();
    let intervalMonth = (curDate.getFullYear() * 12 + curDate.getMonth()) - (startDate.getFullYear() * 12 + startDate.getMonth());
    let coefficient = Math.pow(1.01, intervalMonth);
    let pby = 0;
    // 如果是盈利收益率
    if (fundItemObj.pType == staticData.RATE.PY) {
      pby = Math.pow((fundItemObj.curPe / fundItemObj.startPe), fundItemObj.multiple);
    } else {
      pby = Math.pow((fundItemObj.startPe / fundItemObj.curPe), fundItemObj.multiple);
    }
    //是否递增
    let result = 0;
    if (this.data.isChecked) {
      result = (parseFloat(fundItemObj.startMoney) * coefficient * pby).toFixed(0);
    } else {
      result = (parseFloat(fundItemObj.startMoney) * pby).toFixed(0);
    }
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
        let count = result / (fundItemObj.curStockPrice || 1);
        let small = count % 100;
        let large = parseInt(count / 100) * 100;
        if (small > 50) {
          small = 100;
        } else {
          small = 0;
        }
        real = parseFloat(fundItemObj.curStockPrice) * (large + small)
        this.setData({
          stockCount: large + small
        })
      }
      fundItemObj.resultMoney = parseFloat(real.toFixed(2))
      fundItemObj.curTime = utils.formatTime(new Date()).split(' ')[0].replace(/\//g, '-');
      fundItemObj.fundName = this.data.curFund.fundName;
      fundItemObj.fundCode = this.data.curFund.fundCode;
      this.setData({
        resultMoney: result,
        realMoney: fundItemObj.resultMoney,
        submitObj: fundItemObj,
      })
    }
  },
  add() {
    try {
      let fundItemObj = this.data.submitObj;
      let nowDate = utils.formatTime(new Date()).split(' ')[0]
      let data = wx.getStorageSync(nowDate)
      if (data && data instanceof Array) {
        if (data.every(item => item.fundCode != fundItemObj.fundCode)) {
          data.push(fundItemObj)
        } else {
          wx.showModal({
            title: '提示',
            content: '基金已存在,是否替换？',
            confirmColor: '#00CCFF',
            success: (res) => {
              if (res.confirm) {
                console.log('用户点击确定')
                let index = data.findIndex(item => {
                  return item.fundCode == fundItemObj.fundCode
                });
                data.splice(index, 1, fundItemObj)
                wx.setStorageSync(nowDate, data)
                wx.navigateBack({
                  delta: 1
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          return;
        }
      } else {
        data = [fundItemObj]
      }
      wx.showModal({
        title: '提示',
        content: '确认保存？',
        confirmColor: '#00CCFF',
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.setStorageSync(nowDate, data)
            wx.navigateBack({
              delta: 1
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
})
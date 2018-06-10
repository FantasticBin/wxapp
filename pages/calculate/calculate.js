// pages/calculate/calculate.js
var staticData = require("../../staticData.js");
var utils = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fundList: null,
    resultMoney: 0,
    nowDate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    let nowDate = utils.formatTime(new Date()).split(' ')[0]
    let data = wx.getStorageSync(nowDate)
    if (data) {
      let sum = 0;
      for (let key in data) {
        sum += parseFloat(data[key].resultMoney)
      }
      this.setData({
        fundList: data,
        resultMoney: sum,
        nowDate: nowDate
      })
    }
    this.setData({
      nowDate: nowDate
    })
  },
  clear() {
    try {
      wx.removeStorageSync(this.data.nowDate)
      this.setData({
        fundList: null,
        resultMoney: 0,
      })
    } catch (e) {
      // Do something when catch error
    }
  }
})
// pages/calculate/calculate.js
var staticData = require("../../staticData.js");
var utils = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fundList: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    this.loadData();
  },
  loadData() {
    let data = wx.getStorageSync(staticData.SELF_FUND_LIST)
    if (data) {
      this.setData({
        fundList: data,
      })
    }
  },
  toDetail(e) {
    wx.navigateTo({
      url: `../self_add/self_add?index=${e.currentTarget.dataset.index}`
    })
  },
  longPress(e) {
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      confirmColor: '#00CCFF',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          let index = e.currentTarget.dataset.index;
          let listTemp = Object.assign([], this.data.fundList);
          listTemp.splice(index, 1);
          console.log(listTemp)
          wx.setStorageSync(staticData.SELF_FUND_LIST, listTemp)
          this.loadData();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
})
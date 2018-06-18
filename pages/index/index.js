//index.js
var staticData = require("../../staticData.js");
//获取应用实例
const app = getApp()

Page({
  data: {},
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '投资计算器'
    })
    this.getOcrAccessToken()
  },
  getOcrAccessToken() {
    let date_tag = 'lastDate'
    let lastDateStr = wx.getStorageSync(date_tag)
    let now = new Date().getTime();
    if (lastDateStr) {
      let lastDate = new Date(lastDateStr).getTime();
      let days = (now - lastDate) / (1000 * 60 * 60 * 24);
      if (days < 29) {
        return;
      }
    } else {
      wx.setStorageSync(date_tag, new Date('2018/6/1').getTime())
    }
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token', //仅为示例，并非真实的接口地址
      data: {
        grant_type: 'client_credentials',
        client_id: 'QD6HSCnULilf8kXT7sGHyDIY',
        client_secret: 'B8LfPD9zhbuMrZFmFwGVtqnK2MvVnOxY'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.setStorageSync(staticData.ACCESS_TOCKEN, res.data.access_token)
      }
    })
  }
})
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
    let now = new Date();
    if (lastDateStr) {
      let lastDate = new Date(lastDateStr);
      if (now.getFullYear() == lastDate.getFullYear() &&
        now.getMonth() == lastDate.getMonth() &&
        now.getDate() == lastDate.getDate()) {
        return;
      }
    }
    console.log('----getToken----')
    wx.setStorageSync(date_tag, new Date().getTime())
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      data: {
        grant_type: 'client_credentials',
        client_id: 'QD6HSCnULilf8kXT7sGHyDIY',
        client_secret: 'B8LfPD9zhbuMrZFmFwGVtqnK2MvVnOxY'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        wx.setStorageSync(staticData.ACCESS_TOCKEN, res.data.access_token)
      }
    })
  }
})
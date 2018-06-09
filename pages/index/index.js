//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  //事件处理函数
  toDingTou: function (event) {
    let title = event.currentTarget.dataset.value;
    this.getData(title)
    this.setData({
      currentIndex:title
    })
  },
  onLoad: function () {
    this.getData('in_theaters')
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getData(title){
    let data = wx.getStorageSync(`videos_${title}`);
    let dataTime = wx.getStorageSync(`datatime`);
    let now = new Date();
    let sessionDate = new Date(dataTime);
    if (data && !(now.getMonth() > sessionDate.getMonth() || now.getDate() > sessionDate.getDate())) {
      // this.setData({
      //   videos: data
      // })
    } else {
      // this.setData({
      //   videos: []
      // })
      // wx.showLoading({
      //   title: '正在加载',
      // })
      // console.log('wx.request')
      // wx.request({
      //   url: `https://api.douban.com/v2/movie/${title}?count=100`, //仅为示例，并非真实的接口地址
      //   header: {
      //     'content-type': 'application/text' // 默认值
      //   },
      //   success: (res) => {
      //     let data = [];
      //     for (let item of res.data.subjects){
      //       if (item.hasOwnProperty('subject')) {
      //         data.push(item.subject);
      //       }else{
      //         data.push(item);
      //       }
      //     }
      //     this.setData({
      //       videos: data
      //     })
      //     wx.setStorageSync(`datatime`, new Date().getTime())
      //     wx.setStorageSync(`videos_${title}`, this.data.videos)
      //     wx.hideLoading();
      //   }
      // })
    }
  }

})

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgSrc: [],
    videos:[],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    let data = wx.getStorageSync('videos');
    if(data){
      console.log('wx.getStorageSync')
      console.log(data)
      this.setData({
        videos: data
      })
    }else{
      console.log('wx.request')
      wx.request({
        url: 'https://api.douban.com/v2/movie/in_theaters?count=10', //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/text' // 默认值
        },
        success: (res) => {
          console.log(res)
          this.setData({
            videos: res.data.subjects
          })
          wx.setStorageSync('videos', this.data.videos)
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  chooseImage: function() {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        console.log(res);
        that.setData({
          imgSrc: res.tempFilePaths
        })
      }
    });
  }

})

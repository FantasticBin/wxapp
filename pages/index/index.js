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
    titleButtons:[
      {
        name:'正在热映',
        value:'in_theaters'
      },
      {
        name:'即将上映',
        value:'coming_soon'
      },
      {
        name:'口碑榜',
        value:'weekly'
      },
      {
        name:'北美票房榜',
        value:'us_box'
      },
      {
        name:'新片榜',
        value:'new_movies'
      },
      {
        name:'Top250',
        value:'top250'
      },
    ]
  },
  //事件处理函数
  reload: function (event) {
    let title = event.currentTarget.dataset.value;
    this.getData(title)
  },
  onLoad: function () {
    this.getData('in_theaters')
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
  },

  getData(title){
    let data = wx.getStorageSync(`videos_${title}`);
    if (data) {
      console.log('wx.getStorageSync')
      console.log(data)
      this.setData({
        videos: data
      })
    } else {
      this.setData({
        videos: []
      })
      wx.showLoading({
        title: '正在加载',
      })
      console.log('wx.request')
      wx.request({
        url: `https://api.douban.com/v2/movie/${title}?count=30`, //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/text' // 默认值
        },
        success: (res) => {
          console.log(res)
          this.setData({
            videos: res.data.subjects
          })
          wx.setStorageSync(`videos_${title}`, this.data.videos)
          wx.hideLoading();
        }
      })
    }
  }

})

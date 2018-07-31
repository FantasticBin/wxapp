// pages/calculate/calculate.js
var staticData = require("../../staticData.js");
var utils = require("../../utils/util.js");
var upng = require('../../lib/upng-js/UPNG.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fundList: null,
    resultMoney: 0,
    canvasWidth: '0px',
    canvasHeight: '0px',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    wx.setNavigationBarTitle({
      title: '定投计算'
    })
    this.loadData();
  },
  loadData() {
    let data = wx.getStorageSync(staticData.SAVED_FUND_LIST)
    if (data) {
      let sum = 0;
      for (const item of data) {
        sum += parseFloat(item.resultMoney)
      }
      this.setData({
        fundList: data,
        resultMoney: sum,
      })
    }
  },
  toDetail(e) {
    wx.navigateTo({
      url: `../add/add?index=${e.currentTarget.dataset.index}`
    })
  },
  longPress(e) {
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      confirmColor: '#00CCFF',
      success: (res) => {
        if (res.confirm) {
          let index = e.currentTarget.dataset.index;
          let listTemp = Object.assign([], this.data.fundList);
          listTemp.splice(index, 1);
          wx.setStorageSync(staticData.SAVED_FUND_LIST, listTemp)
          this.loadData();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  clear() {
    try {
      wx.removeStorageSync(staticData.SAVED_FUND_LIST)
      this.setData({
        fundList: null,
        resultMoney: 0,
      })
    } catch (e) {
      // Do something when catch error
    }
  },
  getImg() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        let picObj = res.tempFiles[0]
        if (picObj.size > (2 * 1024 * 1024)) {
          wx.showToast({
            title: '图片大小不能超过2M',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePath = picObj.path
        wx.getImageInfo({
          src: tempFilePath,
          success: (res) => {
            this.drawImg(res, tempFilePath)
          }
        })
      }
    })
  },
  drawImg(data, tempFilePath) {
    wx.showLoading({
      title: '正在识别...',
      mask: true,
    })
    let imgWidth = data.width;
    let imgHeight = data.height;
    this.setData({
      canvasWidth: imgWidth + 'px',
      canvasHeight: imgHeight + 'px'
    })
    let self = this;
    let canvasID = 'img'
    let canvas = wx.createCanvasContext(canvasID)
    // 1. 绘制图片至canvas
    canvas.drawImage(tempFilePath, 0, 0, imgWidth, imgHeight)
    // 绘制完成后执行回调，API 1.7.0
    canvas.draw(false, () => {
      // 2. 获取图像数据， API 1.9.0
      setTimeout(_ => {
        wx.canvasGetImageData({
          canvasId: canvasID,
          x: 0,
          y: 0,
          width: imgWidth,
          height: imgHeight,
          success(res) {
            canvas.clearRect(0, 0, imgWidth, imgHeight)
            canvas.draw()
            // 3. png编码
            let pngData = upng.encode([res.data.buffer], res.width, res.height, 256)
            // 4. base64编码
            let base64 = wx.arrayBufferToBase64(pngData)
            let accessTocken = wx.getStorageSync(staticData.ACCESS_TOCKEN)
            wx.request({
              url: `https://aip.baidubce.com/rest/2.0/solution/v1/iocr/recognise?access_token=${accessTocken}`,
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                image: encodeURI(base64),
                // templateSign: 'a91a7f83eb860a2a1963623ddbd71025',
                templateSign: '22f781e9a174df67d1e40fce72de5624',
              },
              success: (res) => {
                wx.hideLoading()
                if (res.data.error_code == 0) {
                  let resultList = res.data.data.ret
                  if (resultList && resultList instanceof Array) {
                    self.parseData(resultList);
                  } else {
                    wx.showToast({
                      title: '图片无法识别，请重试',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                } else {
                  wx.showToast({
                    title: res.data.error_msg,
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            })
          }
        })
      }, 300)

    })
  },
  parseData(list) {
    // console.log(list)
    let tempArr = [];
    let map = {
      '基金名称': 'fundName',
      '盈利收益率': 'curPy',
      '市盈率': 'curPe',
      '场内基金': 'fundInnerCode',
      '场外基金': 'fundOuterCode',
    }
    //数据整合__以行为单位
    for (const item of list) {
      let tempStrArr = item.word_name.split('#');
      let rowNum = tempStrArr[1] - 1;
      let columsName = tempStrArr[2];
      if (tempArr[rowNum]) {
        if (item.word) {
          if (map[columsName]) {
            tempArr[rowNum][map[columsName]] = item.word
          }
        }
      } else {
        tempArr[rowNum] = {
          [map[columsName]]: item.word
        }
      }
    }
    // console.log(tempArr)
    let selfFundList = wx.getStorageSync(staticData.SELF_FUND_LIST)
    if (!selfFundList) {
      wx.showToast({
        title: '请先添加自选基金',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let finalArr = [];
    for (const item of selfFundList) {
      let tempItem = Object.assign({}, item);
      let ImgResultItem = tempArr.find(ele => {
        if (ele.fundOuterCode) {
          return ele.fundOuterCode == tempItem.fundCode
        } else {
          return ele.fundInnerCode == tempItem.fundCode
        }
      })
      if (ImgResultItem) {
        tempItem.curPe = ImgResultItem.curPy ? ImgResultItem.curPy.replace(/%/g, '') : null || ImgResultItem.curPe
        tempItem.limitLow = item.pType == 1 ? (parseFloat(item.limitPe) < parseFloat(tempItem.curPe) ? true : false) : (parseFloat(item.limitPe) > parseFloat(tempItem.curPe) ? true : false)
        tempItem.multiple = 2
        tempItem.curTime = utils.formatTime(new Date()).split(' ')[0].replace(/\//g, '-')
        tempItem.resultMoney = this.calculate(tempItem)
        finalArr.push(tempItem)
      }
    }
    // console.log(finalArr)
    if (finalArr.length > 0) {
      wx.setStorageSync(staticData.SAVED_FUND_LIST, finalArr)
      this.loadData();
    } else {
      wx.showToast({
        title: '未匹配到您的自选基金',
        icon: 'none',
        duration: 2000
      })
    }
  },
  calculate(fundItemObj) {
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
    let result = (parseFloat(fundItemObj.startMoney) * pby).toFixed(0);
    if (!isNaN(result)) {
      let real = 0;
      if (fundItemObj.fundType == staticData.FUND_TYPE.OUTER) {
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
        real = parseFloat(fundItemObj.curStockPrice || 0) * (large + small)
      }
      return real;
    }
  }
})
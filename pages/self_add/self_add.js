// pages/self_add/self_add.js
var staticData = require("../../staticData.js");
var utils = require("../../utils/util.js");
var fundList = require("../../lib/fundcode_search.js");
var selectTimer = -1;

Page({
  data: {
    date: '2018-6-16',
    selectedFund: null,
    selectList: null,
    today: null,
    startMoney: null,
    startPe: null,
    limitPe: null,
    fundType: staticData.FUND_TYPE.OUTER,
    fundTypes: [{
        name: '场外基金',
        value: staticData.FUND_TYPE.OUTER,
      },
      {
        name: '场内基金',
        value: staticData.FUND_TYPE.INNER
      },
    ],
    pType: '1',
    pTypes: [{
        name: '盈利收益率',
        value: 1,
      },
      {
        name: '市盈率',
        value: 2
      },
      {
        name: '市净率',
        value: 3
      },
    ],
  },
  onLoad: function(options) {
    if (options.index >= 0) {
      let data = wx.getStorageSync(staticData.SELF_FUND_LIST)
      let item = data[options.index];
      this.setData({
        date: item.startDate,
        today: utils.formatTime(new Date()).split(' ')[0].replace(/\//g, '-'),
        selectedFund: {
          name: item.fundName,
          code: item.fundCode
        },
        startMoney: item.startMoney,
        startPe: item.startPe,
        limitPe: item.limitPe,
        fundType: item.fundType,
        pType: item.pType,
      })
    } else {
      this.setData({
        today: utils.formatTime(new Date()).split(' ')[0].replace(/\//g, '-'),
        date: utils.formatTime(new Date()).split(' ')[0].replace(/\//g, '-'),
      })
    }
  },
  bindKeyInput(e) {
    let prop = e.target.id;
    let value = e.detail.value;
    if (prop == 'fundName') {
      clearTimeout(selectTimer)
      if (value) {
        selectTimer = setTimeout(_ => {
          // console.log(value)
          let filterList = fundList.filter(item => {
            return item.join(',').indexOf(value.toUpperCase()) !== -1
          })
          // console.log(filterList)
          this.setData({
            selectList: filterList,
          })
        }, 500)
      } else {
        this.setData({
          selectList: null,
        })
      }
    } else {
      this.setData({
        [prop]: value,
      })
    }
  },
  itemClick(e) {
    // console.log(e)
    this.setData({
      selectedFund: {
        code: e.currentTarget.dataset.code,
        name: e.currentTarget.dataset.name,
      },
      selectList: null,
    })
  },
  delSelected(e) {
    this.setData({
      selectedFund: null,
    })
  },
  fundTypeChange(e) {
    this.setData({
      fundType: e.detail.value,
    })
  },
  pTypeChange(e) {
    this.setData({
      pType: e.detail.value,
    })
  },
  fundPEChange(e) {
    console.log(e)
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value,
    })
  },
  save() {
    let fund = this.data.selectedFund
    let startDate = this.data.date
    let startMoney = this.data.startMoney
    let startPe = this.data.startPe
    let limitPe = this.data.limitPe
    let fundType = this.data.fundType
    let pType = this.data.pType
    if (!fund || !startDate || !startMoney || !startPe || !limitPe) {
      wx.showToast({
        title: '请填写完整',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    try {
      let obj = {
        fundName: fund.name,
        fundCode: fund.code,
        fundType: fundType,
        startDate: startDate,
        startMoney: startMoney,
        pType: pType,
        startPe: startPe,
        limitPe: limitPe,
      }
      let data = wx.getStorageSync(staticData.SELF_FUND_LIST)
      if (data instanceof Array) {
        let defaultIndex = -1;
        for (let i = 0; i < data.length; i++) {
          if (data[i].fundCode == fund.code) {
            defaultIndex = i;
            break;
          }
        }
        if (defaultIndex == -1) {
          data.push(obj)
        } else {
          wx.showModal({
            title: '提示',
            content: '基金已存在,是否替换？',
            confirmColor: '#00CCFF',
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                console.log('用户点击确定')
                data.splice(defaultIndex, 1, obj)
                wx.setStorageSync(staticData.SELF_FUND_LIST, data)
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
        data = [obj]
      }
      wx.showModal({
        title: '提示',
        content: '确认保存？',
        confirmColor: '#00CCFF',
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.setStorageSync(staticData.SELF_FUND_LIST, data)
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
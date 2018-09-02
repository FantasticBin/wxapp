const {
  watch,
  computed
} = require('../../utils/vuefy.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: '',
    rate: '',
    years: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    computed(this, {
      result: function() {
        // 触发rate改变
        console.log(this.data.rate)
        let fuli = 0;
        for (let i = 1; i <= this.data.years; i++) {
          fuli += Math.pow((1 + this.data.rate / 100), i);
        }
        // 无穷大
        if(!isFinite(fuli)){
          return 'infinity'
        }
        fuli = fuli.toFixed(6);
        let endMoney = this.data.money * fuli;
        if (endMoney > 100000000) {
          endMoney = (endMoney / 100000000).toFixed(4) + '亿';
        } else if (endMoney > 10000) {
          endMoney = (endMoney / 10000).toFixed(2) + '万';
        } else if (endMoney > 0) {
          endMoney = parseFloat(endMoney.toFixed(2));
        } else {
          endMoney = '';
        }
        return endMoney;
      },
    })
  },
  inputChange(e) {
    let propertyName = e.currentTarget.dataset.type;
    let value = e.detail.value;
    this.setData({
      [propertyName]:value
    })
  }
})
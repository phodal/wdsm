var api = require('../../utils/api.js')
var app = getApp()
Page({
  data: {
  },

  onLoad () {
  },

  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },

  formSubmit: function(e) {
    api.post('https://www.wandianshenme.com/api/api-auth/', e.detail.value)
      .then(res => {
        let token = res.data;
        const _token = JSON.stringify(token);
        wx.setStorageSync('jwt', _token);
        wx.navigateBack();
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })
      })
  }
})

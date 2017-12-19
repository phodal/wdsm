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
        let data = res.data;
        if (!!data.token) {
          const _token = JSON.stringify(data.token);
          wx.setStorageSync('jwt', _token);
          wx.navigateBack();
          wx.showToast({
            title: '登录成功',
            icon: 'success_no_circle',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'cancel',
            duration: 2000
          });
        }
      })
  }
})

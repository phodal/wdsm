// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    username: '',
    email: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let jwt = wx.getStorageSync('jwt');
    function parseJwt(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(atob(base64));
    };

    if(!!jwt) {
      let userInfo = parseJwt(jwt);
      let username = userInfo.username;
      let email = userInfo.email;
      this.setData({
        isLogin: true,
        username: username,
        email: email
      })
    }
  },

  login() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  onShareAppMessage: function () {
  
  }
})
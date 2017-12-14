var api = require('../../utils/api.js');
var app = getApp()
Page({
  data: {
    systemInfo: {},
    _api: {},
    loading: true,
  },

  onLoad: function () {
    let that = this;
    app.getSystemInfo(function(res) {
      that.setData({
        systemInfo: res
      })
    });

    that.setData({
      _api: api
    });

    this.onPullDownRefresh()
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    api.get(`${api.HOST}${api.CATEGORY}`)
      .then(res => {
        this.setData({
          category: res.data.results,
          loading: false
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      })
  },

  onItemClick(e) {
    let categoryUrl = e.currentTarget.dataset.slug;
    wx.navigateTo({
      url: '/pages/list/list?url=' + `${api.HOST_PLAY}?category=${categoryUrl}`
    })
  },
})

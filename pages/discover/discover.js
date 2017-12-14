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
    let slug = e.currentTarget.dataset.slug;
    let title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: `/pages/list/list?title=${title}&category=${slug}`
    })
  },
})

var api = require('../../utils/api.js');
var app = getApp();

Page({
  data: {
    systemInfo: {},
    _api: {},
    list: []
  },

  onLoad() {
    var that = this;
    app.getSystemInfo(function (res) {
      that.setData({
        systemInfo: res
      })
    });

    that.setData({
      _api: api
    });

    this.onPullDownRefresh()
  },

  onItemClick(e) {
    wx.navigateTo({
      url: '/pages/work-detail/work-detail?rowId=' + e.currentTarget.dataset.rowId
    })
  },

  switchNav(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    });
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    api.get(api.HOST_PLAY)
      .then(res => {
        this.setData({
          data: res.data
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      })
  }
});

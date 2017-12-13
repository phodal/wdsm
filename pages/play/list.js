var api = require('../../utils/api.js');
var app = getApp();

Page({
  data: {
    systemInfo: {},
    _api: {},
    list: [],
    nextUrl: ''
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

  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    api.get(api.HOST_PLAY)
      .then(res => {
        this.setData({
          data: res.data.results,
          nextUrl: res.data.next
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      })
  },

  onReachBottom() {
    wx.showNavigationBarLoading();
    if (!!this.data.nextUrl) {
      api.get(this.data.nextUrl)
        .then(res => {
          wx.hideNavigationBarLoading();
          this.setData({
            data: this.data.data.concat(res.data.results),
            nextUrl: res.data.next
          });
        })
    }
  }
});

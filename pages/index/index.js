var api = require('../../utils/api.js');
var app = getApp();

Page({
  data: {
    systemInfo: {},
    _api: {},
    navbar: ['最新', '最火', '最热'],
    currentNavbar: '0',
    swipers: [],
    list: [],
    hot_last_id: 0,
    latest_list: [],
    latest_last_id: 0
  },

  onLoad () {
    var that = this;
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

  onItemClick (e) {
    var targetUrl = api.PAGE_WORK
    if (e.currentTarget.dataset.rowId != null)
      targetUrl = targetUrl + '?rowId=' + e.currentTarget.dataset.rowId
    wx.navigateTo({
      url: targetUrl
    })
  },

  switchNav (e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    });
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh () {
    wx.showNavigationBarLoading();
    api.get(api.HOST + api.HOME)
      .then(res => {
        this.setData({
          data: res.data
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      })
  }
});

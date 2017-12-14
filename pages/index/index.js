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

    this.onPullDownRefresh();
  },

  onItemClick (e) {
    wx.navigateTo({
      url: '/pages/work-detail/work-detail?rowId=' + e.currentTarget.dataset.rowId
    })
  },

  gotoSearchPage(e) {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  switchNav (e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    });
  },

  onPullDownRefresh () {
   
   
  }
});

var api = require('../../utils/api.js');
var WxSearch = require('../../wxSearch/wxSearch.js');
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
    WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
  },

  onItemClick (e) {
    wx.navigateTo({
      url: '/pages/work-detail/work-detail?rowId=' + e.currentTarget.dataset.rowId
    })
  },

  switchNav (e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    });
  },

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
  },
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }
});

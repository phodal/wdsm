var api = require('../../utils/api.js');
var WxParse = require('../../wxParse/wxParse.js');
var showdown = require('../../wxParse/showdown.js');
var converter = new showdown.Converter();

var app = getApp();

Page({
  data: {
    systemInfo: {},
    _api: {},
    data: {}
  },

  onLoad: function (options) {
    var that = this;
    app.getSystemInfo(function(res) {
      that.setData({
        systemInfo: res
      })
    });

    that.setData({
      _api: api
    });
    if (options === null || options.rowId === null) {
      return
    } else {
      api.get(`${api.HOST_PLAY}${options.rowId}`)
        .then(res => {
          that.setData({
            data: res.data
          });
          var html = converter.makeHtml(res.data.content);
          WxParse.wxParse('article', 'html', html, that, 5);
        });
    }
  },

  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  }
});

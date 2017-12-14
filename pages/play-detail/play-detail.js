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
          function formatDate(date) {
            var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
          }
          that.setData({
            data: res.data,
            publishDate: formatDate(res.data.updated)
          });
          var html = converter.makeHtml(res.data.content);
          WxParse.wxParse('article', 'html', html, that, 5);
        });
    }
  },

  onItemClick(e) {
    wx.navigateTo({
      url: '/pages/play-detail/play-detail?rowId=' + e.currentTarget.dataset.rowId
    })
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  }
});

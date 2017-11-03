var api = require('../../utils/api.js')
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
          })
        })
    }
  },

  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  }
});

var api = require('../../utils/api.js');
var app = getApp();

Page({
  data: {
    systemInfo: {},
    _api: {},
    list: [],
    loading: false,
    nextUrl: ''
  },

  onLoad(options) {
    var that = this;
    app.getSystemInfo(function (res) {
      that.setData({
        systemInfo: res
      })
    });

    let defaultUrl =  api.HOST_PLAY;
    if(options && options.category) {
        defaultUrl = `${api.HOST_PLAY}?category=${options.category}`;
    }
    if(options && options.keyword) {
        defaultUrl = `${api.HOST_PLAY}?title=${options.keyword}`;
    }

    if(options && options.title) {
      wx.setNavigationBarTitle({
        title: options.title
      })
    }

    that.setData({
      _api: api,
      defaultUrl: defaultUrl
    });

    this.onPullDownRefresh()
  },

  onItemClick(e) {
    wx.navigateTo({
      url: '/pages/play-detail/play-detail?rowId=' + e.currentTarget.dataset.rowId
    })
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    this.setData({
      loading: true
    })
    api.get(this.data.defaultUrl)
      .then(res => {
        this.setData({
          data: res.data.results,
          nextUrl: res.data.next,
          loading: false
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      })
  },

  onReachBottom() {
    wx.showNavigationBarLoading();
    if (!!this.data.nextUrl) {
      this.setData({
        loading: true
      })
      api.get(this.data.nextUrl)
        .then(res => {
          this.setData({
            data: this.data.data.concat(res.data.results),
            nextUrl: res.data.next,
            loading: false
          });
          wx.hideNavigationBarLoading();
        })
    }
  }
});

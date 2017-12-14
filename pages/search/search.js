var api = require('../../utils/api.js');
var WxSearch = require('../../wxSearch/wxSearch.js');
var app = getApp();

Page({
  data: {

  },

  onLoad() {
    var that = this;

    WxSearch.init(that, 43, ['精选', '智能家居', 'AI', '智能音箱', '物联网', '自动驾驶']);
    WxSearch.initMindKeys(['精选', '智能家居', 'AI', '智能音箱', '物联网', '自动驾驶']);
  },

  onItemClick(e) {
    
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

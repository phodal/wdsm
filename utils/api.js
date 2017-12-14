'use strict';
import Promise from './es6-promise.min'

module.exports = {
  HOST: 'https://www.wandianshenme.com/api/',
  HOST_STATIC: 'https://www.wandianshenme.com/static/media/',
  HOST_PLAY: 'https://www.wandianshenme.com/api/play/',
  HOST_SEARCH: 'https://www.wandianshenme.com/api/play/?title=',
  HOT: 'home',
  KEYWORD: 'keyword/',
  CATEGORY: 'category/?limit=50',
  HOME: 'home',
  LATEST: 'home',

  SWIPERS: 'http://ios1.artand.cn/discover/home/rank',

  SIGN_UP: 'https://www.wandianshenme.com/api/auth/',
  LOGIN: 'https://www.wandianshenme.com/api/auth/',
  GET_VERIFICATION: 'https://www.wandianshenme.com/',

  get (url) {
    return new Promise((resolve, reject) => {
      console.log(url)
      wx.request({
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  },

  post (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        method: 'POST',
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/x-www-form-urlencode;charset=UTF-8;'
        },
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  },

  json2Form(json) {
    var str = []
    for(var p in json){
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]))
    }
    return str.join("&")
  }

};

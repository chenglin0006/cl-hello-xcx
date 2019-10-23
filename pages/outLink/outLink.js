//logs.js
const util = require('../../utils/util.js')
var shareUtil = require('../../utils/shareUtil.js')
Page({
  data: {
    h5Url:''
  },
  onLoad: function (options) {
    // console.log('h5Url', options.h5Url)
    this.setData({ h5Url: decodeURIComponent(options.h5Url)});
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      return shareUtil.commonShareData()
  }
})

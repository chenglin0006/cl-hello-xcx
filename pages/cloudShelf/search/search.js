// pages/cloudShelf/search/search.js
var WxSearch = require('../wxSearchView/wxSearchView.js');
var baserequest = require("../../../utils/baserequest.js")
var url = require('../../../configs/FurtureStoreUrl.js')
var shareUtil = require('../../../utils/shareUtil.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
      fromlist:false,
      searchList:[],
      searchPlaceHolder:'搜索商品、品牌'
    },
    /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    console.log('options====', options)
        // 2 搜索栏初始化
        var that = this;
      if (options) {
        this.setData({
          fromlist: options.fromlist && options.fromlist==1 ? true :false,
        });
      }
        WxSearch.init(
            that,  // 本页面一个引用
            [], // 热点搜索推荐，[]表示不使用
            [],// 搜索匹配，[]表示不使用
            that.mySearchFunction, // 提供一个搜索回调函数
            that.myGobackFunction //提供一个返回回调函数
        );
    baserequest.salesAdminRequest(url.homepageHotlist(wx.getStorageSync('shopCode'),10,3), (data) => {
      this.setData({ searchList:data.data})
    }, (code) => {
      
    },false,true)
    baserequest.request(url.homepageDefaultsech(wx.getStorageSync('shopCode'), 10), (data) => {
      if (data.data && data.data.title) {
        this.setData({ searchPlaceHolder: data.data.title })
      }

    }, (code) => {

    }, false, false)
    },
    // 3 转发函数，固定部分，直接拷贝即可
    wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
    wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
    wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
    wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
    wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

    // 4 搜索回调函数
    mySearchFunction: function (value) {
        // do your job here
        // 示例：跳转
      wx.redirectTo({
        url: '../list/list?isFromSearch=true&searchValue=' + value
      })
      // if (this.data.fromlist){
      //   wx.navigateBack({ delta: 1})
      //   wx.redirectTo({
      //     url: '../list/list?searchValue=' + value
      //   })
      //   }else{
      //   console.log('zzzzzz')
      //   wx.redirectTo({
      //     url: '../list/list?searchValue=' + value
      //   })
      //   }
        
    },

    // 5 返回回调函数
    myGobackFunction: function () {
        // do your job here
        // 示例：返回
        wx.redirectTo({
            url: '../list/list?searchValue=返回'
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return shareUtil.commonShareData()
    }
})
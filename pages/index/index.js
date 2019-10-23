//index.js
//获取应用实例
const app = getApp()
var baserequest = require("../../utils/baserequest.js")
var url = require('../../configs/FurtureStoreUrl.js')
var stringutil = require('../../utils/stringutil.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    current: 0,
    imgUrls:[],
    changeTime: 0,
  },
  //事件处理函数
  bindViewTap: function(event) {
    let type = event.target.dataset.type;
    if(type == 'hello'){
      wx.navigateTo({
        url: '../hello/index'
      }) 
    } else {
      wx.navigateTo({
        url: '../logs/logs'
      }) 
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getAdScreenList(1004,true);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onSlideChangeEnd: function (e) {
    wx.setStorage({ key: "current", data: e.detail.current });
  },
  jumpLink:function(e){
    let h5Url = e.target.dataset.href;
    wx.navigateTo({
      url: '../outLink/outLink?h5Url='+encodeURIComponent('https://res1.bnq.com.cn/82c7ab7b-5c48-4ad4-844f-c4d3a6bd3763')
    })
  },
  getAdScreenList: function (shopCode=1004,skowLoad=true) {
    let _this = this;
    _this.setData({
      changeTime:5,
      imgUrls:[{
        bizType:44,
        coverAllCityFlag:null,
        coverAllShopFlag:1,
        coverAllTerminalFlag:0,
        detailType:2,
        executeState:1,
        h5Url:"https://m.fs.bnq.com.cn/preview?type=advertisement&id=249",
        id:249,
        location:5,
        mainPicUrl:"https://res1.bnq.com.cn/82c7ab7b-5c48-4ad4-844f-c4d3a6bd3763?t=1568623423919&width=690&height=376/imageView2/1/size-limit/300k/quality/100/w/1380/h/752",
        miniProgramAppId:"",
        miniProgramUrl:"",
        rankWeight:999,
        showState:1,
        sku:"",
        title:"环保家装",
      },{
        bizType:44,
        coverAllCityFlag:null,
        coverAllShopFlag:1,
        coverAllTerminalFlag:0,
        detailType:2,
        executeState:1,
        h5Url:"https://m.fs.bnq.com.cn/preview?type=advertisement&id=249",
        id:1,
        location:5,
        mainPicUrl:"https://res1.bnq.com.cn/82c7ab7b-5c48-4ad4-844f-c4d3a6bd3763?t=1568623423919&width=690&height=376/imageView2/1/size-limit/300k/quality/100/w/1380/h/752",
        miniProgramAppId:"",
        miniProgramUrl:"",
        rankWeight:999,
        showState:1,
        sku:"",
        title:"环保家装",
      },{
        bizType:44,
        coverAllCityFlag:null,
        coverAllShopFlag:1,
        coverAllTerminalFlag:0,
        detailType:2,
        executeState:1,
        h5Url:"https://m.fs.bnq.com.cn/preview?type=advertisement&id=249",
        id:2,
        location:5,
        mainPicUrl:"https://res1.bnq.com.cn/82c7ab7b-5c48-4ad4-844f-c4d3a6bd3763?t=1568623423919&width=690&height=376/imageView2/1/size-limit/300k/quality/100/w/1380/h/752",
        miniProgramAppId:"",
        miniProgramUrl:"",
        rankWeight:999,
        showState:1,
        sku:"",
        title:"环保家装",
      },{
        bizType:44,
        coverAllCityFlag:null,
        coverAllShopFlag:1,
        coverAllTerminalFlag:0,
        detailType:2,
        executeState:1,
        h5Url:"https://m.fs.bnq.com.cn/preview?type=advertisement&id=249",
        id:3,
        location:5,
        mainPicUrl:"https://res1.bnq.com.cn/82c7ab7b-5c48-4ad4-844f-c4d3a6bd3763?t=1568623423919&width=690&height=376/imageView2/1/size-limit/300k/quality/100/w/1380/h/752",
        miniProgramAppId:"",
        miniProgramUrl:"",
        rankWeight:999,
        showState:1,
        sku:"",
        title:"环保家装",
      }]
    })
    return
    baserequest.cmsRequest(url.getAdScreenList(5, shopCode, 10, 4, 1, 10), (result) => {
      let data = result.data;
      let imgUrls = data.pictureList && data.pictureList.length > 0 ? data.pictureList : []
      console.log('imgUrls===', imgUrls)
      _this.setData({
        changeTime: data.changeTime,
        imgUrls: imgUrls.map((item, i) => {
          item.mainPicUrl = stringutil.imageRest(item.mainPicUrl, 690, 376)
          return item;
        })
      });
    }, (code) => {
      console.log(code)
      }, skowLoad, true)
  }
})

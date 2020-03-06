//index.js
//获取应用实例
const app = getApp()
var baserequest = require("../../utils/baserequest.js")
var url = require('../../configs/FurtureStoreUrl.js')
const locationUtil = require('../../utils/locationUtil.js');
var stringutil = require('../../utils/stringutil.js')
let isFirstInit = true;

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    current: 0,
    imgUrls:[],
    changeTime: 0,
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    activityCatogeryVOS: [],//活动
    brandActivityVOS: [],//品牌活动
    bnqBigBrand: [],
    iconVOs: [],
    sectionCatogeryGoodsVOS1: null,
    sectionCatogeryGoodsVOS2: null,
    sectionCatogeryGoodsVOS3: null,
    sectionCatogeryGoodsVOS4: null,
    brandCurrent: 0,
  },
  //事件处理函数
  bindViewTap: function(event) {
    let type = event.target.dataset.type;
    if(type == 'own'){
      wx.navigateTo({
        url: '../own/index'
      }) 
    }
  },
  onLoad: function () {
    // this.getLocation();
    locationUtil.getUserLocation((res)=>{
      this.setData({
        latitude:res.latitude,
        longitude:res.longitude,
      })
    })
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
    this.getMainData(1004,false);
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
    let h5Url = e.target.dataset.banner;
    wx.navigateTo({
      url: '../outLink/outLink?h5Url='+encodeURIComponent(h5Url)
    })
  },
  getAdScreenList: function (shopCode=1004,skowLoad=true) {
    let _this = this;
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
  },
  getMainData: function (shopCode=1004,showLoad=false) {
    let _this = this;
    baserequest.request(url.homepageCollection(1, shopCode, 10), (result) => {
      isFirstInit = false
      let data = result.data;
      let activityCatogeryVOS = (data.activityCatogeryVOS && data.activityCatogeryVOS.length > 0 )? data.activityCatogeryVOS : []
      let brandActivityVOS = data.brandActivityVOS && data.brandActivityVOS.length > 0 ? data.brandActivityVOS : []
      let newBrandActivityVOS = []
      for (let i = 0; i < (brandActivityVOS.length / 6) + 1; i++) {
        let childArr = brandActivityVOS.slice(6 * i, 6 * (i + 1))
        if (childArr.length > 0) {
          newBrandActivityVOS.push(childArr)
        }

      }
      _this.setData({
        activityCatogeryVOS: activityCatogeryVOS,
        brandActivityVOS: newBrandActivityVOS,
        bnqBigBrand: data.bnqBigBrand,
        iconVOs: data.iconVOs.slice(0, parseInt(data.iconVOs.length / 4) * 4) ,
        sectionCatogeryGoodsVOS1: data.sectionCatogeryGoodsVOS1,
        sectionCatogeryGoodsVOS2: data.sectionCatogeryGoodsVOS2,
        sectionCatogeryGoodsVOS3: data.sectionCatogeryGoodsVOS3,
        sectionCatogeryGoodsVOS4: data.sectionCatogeryGoodsVOS4,
      })

    }, (code) => {
      console.log(code)
      isFirstInit = true
      }, showLoad, true)
  },
  swiperChange: function (e) {
    var that = this;
    if (e.detail.source == 'touch') {
      that.setData({
        brandCurrent: e.detail.current,

      })
    }
  },
})

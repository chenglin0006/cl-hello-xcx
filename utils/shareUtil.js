var stringutil = require('./stringutil.js')
var usercache = require('./usercache.js')
var baserequest = require('./baserequest.js')
var ownerUrl = require('../configs/OwnerUrl.js')
const app = getApp()
var shareUtil = {
  /**
   * 设置分享数据
   * @param title 标题
   * @param imageUrl 图片Url
   * @param shareContent 分享内容,若是商品分享为sku
   * @param sharePageName 分享页面名
   * @param sharePageUrl 分享页面url 
   * @param shareType 分享类型 	1-分享商品; 2-分享活动
   */
  shareData(title, imageUrl, shareContent, sharePageName, sharePageUrl, shareType){
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = currentPage.route //当前页面url
    var options = currentPage.options //如果要获取url中所带的参数可以查看options
    var path ='/'+stringutil.makeUrl(url, options)
    var sharePath = stringutil.makeUrl(path, { inviterOpenId: app.globalData.userInfo ? app.globalData.userInfo.openId : '', inviterUserId: usercache.getUserId(), inviterUserPhone: usercache.getPhone()})
    
    wx.login({
      success: res => {
        if (res.code) {
          baserequest.yixiaoRequest(ownerUrl.addShareRecord(
            res.code,
            1,
            shareContent,
            sharePageName,
            sharePageUrl,
            shareType,
            1
          ), (data) => {

          }, () => {

          }, false)
        }
      }
    })
    
    console.log('sharePath====', sharePath)
    var shareObj = {
      title: title,
      imageUrl: imageUrl,
      path: sharePath,
    }
    if(!title){
      delete shareObj['title']
    }
    if (!imageUrl){
      delete shareObj['imageUrl']
    }
    return shareObj;
  },
  commonShareData(sharePageName){
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = '/' +currentPage.route //当前页面url
    console.log(window)
    // var pageName = require('../pages/index/index.json')
    
    return this.shareData(sharePageName, null, sharePageName, sharePageName, url, 2)
  },
};
module.exports = shareUtil;
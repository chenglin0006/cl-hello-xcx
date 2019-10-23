var usercache = require('./usercache.js')
var baserequest = require("./baserequest.js")
var memberUrl = require('../configs/MemberUrl.js')
var app = getApp();
var ChatUtil = require('../pages/chat/ChatUtil.js')
var checkLogin = function (successCB, showLoading = true) {
  // wx.navigateTo({
  //   url: '/pages/user/login/login'
  // })
  // usercache.clear()
  // return
  var isLogin = usercache.isLogin()
  if (isLogin) {
    successCB && successCB()
  } else {
    app.loginSuccessCallback = successCB
    wx.login({
      success: res => {
        if (res.code) {
          baserequest.ztRequest(memberUrl.miniProgramLogin(5, res.code), (data) => {
            if (data.authState==0){
              usercache.setUserInfo(data)
              ChatUtil.login().then(() => { }).catch((err) => { })
              successCB && successCB()
            }else{
              wx.navigateTo({
                url: '/pages/user/login/login'
              })
            }
            
          }, (code) => {
            wx.navigateTo({
              url: '/pages/user/login/login'
            })
          },true,false)
        } else {
          wx.navigateTo({
            url: '/pages/user/login/login'
          })
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
      },
      fail:()=>{
        wx.navigateTo({
          url: '/pages/user/login/login'
        })
      }
    }, showLoading)
    
  }
}
var checkLoginForTab = function (successCB,showLoading=true) {
  if (!app.isShowLogin) {
    app.isShowLogin = true
    checkLogin(successCB, showLoading)
  } else {
    app.isShowLogin = false
    var isLogin = usercache.isLogin()
    if (!isLogin) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }else{
      successCB && successCB()
    }
  }
}
var justCheckLogin = function  (successCB) {
  var isLogin = usercache.isLogin()
  if (isLogin) {
    successCB && successCB()
  } else {
    wx.login({
      success: res => {
        if (res.code) {
          baserequest.ztRequest(memberUrl.miniProgramLogin(5, res.code), (data) => {
            if (data.authState == 0) {
              usercache.setUserInfo(data)
              successCB && successCB()
            } 
          }, (code) => {
          }, false, false)
        } 
      },
      fail: () => {
        
      }
    }, false)

  }
}
module.exports = { checkLogin, checkLoginForTab, justCheckLogin}
// pages/user/login/login.js
var stringutil = require('../../../utils/stringutil.js')
var baserequest = require("../../../utils/baserequest.js")
var memberUrl = require('../../../configs/MemberUrl.js')
var usercache = require('../../../utils/usercache.js')
var config = require('../../../configs/config.js')
var ChatUtil = require('../../chat/ChatUtil.js')
var base64Util = require('../../../utils/base64Util.js')
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    code:'',
    locations:[],
    picCode:'',
    codeData: '',
    question:'',
    displayedChoice:'',
    radio: 1,
    loginBtnDisable:true,
    codeBtnDisable:true,
    codeBtnTxt:'获取验证码',
    codeTime:0,
    picCodeUrl: '',
    usePictureCode:false,
    phoneFocus:true,
    smsFocus:false,
    imageCodeFocus:false,
    firstIn:true,
  },
  
  getCode:function(){
    
    if (this.data.locations.length == 0 && this.data.usePictureCode){
      wx.showToast({ title: '请输入图形验证码', icon: 'none', duration: 1000 })
      return
    }
    let arr = []
    this.data.locations.map((item) => {
      arr.push([item.locationX, item.locationY])
  })     
    let encodeData= encodeURI(base64Util.base64encode(JSON.stringify(arr)))
    console.log("encodeURI",JSON.parse(base64Util.base64decode(decodeURI(encodeData))))                      
    baserequest.ztRequest(memberUrl.sendVerifyCode(this.data.phone+'', arr.length>0?encodeData:'',5,240,240/this.data.radio), (data) => {
      this.beginTimeout()
      this.setData({
        phoneFocus: false,
        smsFocus: true,
        imageCodeFocus: false,
      })
    }, (code) => {
      console.log(code)
      if(code==9){
        this.getValidateCode()
        this.setData({
          // picCodeUrl: memberUrl.getGraphicCode(this.data.phone),
          usePictureCode:true,
          phoneFocus: false,
          smsFocus: false,
          imageCodeFocus: true,
        })
      }
    })
    
  },
  getValidateCode:function(){
    baserequest.ztRequest(memberUrl.getValidateCode(this.data.phone+'', this.data.picCode,5), (data) => {
      this.setData({
        locations: [],
        picCodeUrl: data.image,
        codeData: data.code,
        question:data.question,
        displayedChoice:data.displayedChoice,
        radio: data.width / data.height,
      })
    }, (code) => {
      console.log(code)
    })
    
  },
  clickPoint(e){
    let point = [{
      left: e.detail.x - 5,
      top: e.detail.y - 5,
      locationX: e.detail.x - e.target.offsetLeft,
      locationY: e.detail.y - e.target.offsetTop,

    }]
    let locations = this.data.locations ? this.data.locations : []
    console.log('clickPoint',e,this.data.locations, point)
    this.setData({
      locations:locations.concat(point)
    })
  },
  beginTimeout(){
    this.setData({
      codeTime: 60,
      codeBtnTxt: 60 + 's',
      codeBtnDisable: true
    })

    this.time = setInterval(() => {
      if (this.data.codeTime <= 1) {
        this.setData({
          codeTime: 0,
          codeBtnTxt: '获取验证码',
          codeBtnDisable: false
        })
        clearInterval(this.time)
      } else {
        this.setData({
          codeTime: this.data.codeTime - 1,
          codeBtnTxt: this.data.codeTime - 1 + 's',
          codeBtnDisable: true
        })
      }
    }, 1000)
  },
  getWXPhoneNumber:function(e){
    if (!e.detail.iv || !e.detail.encryptedData){
      this.setData({
        firstIn: false
      })
    }else{
      wx.login({
        success: res => {
          if (res.code) {
            wx.reportAnalytics('get_phone_success', {
              channel: app.globalData.channle + '',
            });
            baserequest.ztRequest(memberUrl.miniProgramLoginNoCode(5, res.code, app.globalData.inviterOpenId, app.globalData.inviterUserId, app.globalData.inviterUserPhone, 1, !!app.globalData.inviterOpenId || !!app.globalData.inviterUserPhone, e.detail.iv, e.detail.encryptedData), (data) => {
              usercache.setUserInfo(data)
              ChatUtil.login().then(() => { }).catch((err) => { })
              wx.navigateBack()
              app.loginSuccessCallback && app.loginSuccessCallback()
            }, (code) => {
              this.setData({
                firstIn: false
              })
            })
          } else {
            this.setData({
              firstIn: false
            })
            wx.reportAnalytics('get_phone_fail', {
              channel: app.globalData.channle + '',
            });
            wx.showToast({ title: '获取用户信息失败', icon: 'none', duration: 1000 })
          }
        },
        fail: () => {
          wx.reportAnalytics('get_phone_fail', {
            channel: app.globalData.channle+'',
          });
          this.setData({
            firstIn: false
          })
          wx.showToast({ title: '获取用户信息失败', icon: 'none', duration: 1000 })
        }
      })


    }
  },
  regetPicCode:function(e){
    this.setData({
      picCodeUrl: memberUrl.getGraphicCode(this.data.phone)
    })
  },
  phoneInput:function(e){
    this.setData({
      phone: e.detail.value,
      picCodeUrl: '',
      locations:[],
      usePictureCode:false
    })
    if (!stringutil.checkMobile(e.detail.value)&&e.detail.value.length==11){
      return wx.showToast({
        title: '请输入正确的手机号码',
        icon:'none'
      })
    }
    this.checkButtonIsEnable(e.detail.value, this.data.code)
  },
  picCodeInput:function(e){
    this.setData({
      picCode: e.detail.value
    })
  },
  codeInput:function(e){
    this.setData({
      code: e.detail.value
    })
    this.checkButtonIsEnable(this.data.phone, e.detail.value)
  },
  checkButtonIsEnable(phone,code){
    let codeEnable = false
    let loginEnable = false
    if (stringutil.checkMobile(phone)){
      codeEnable=true
    }
    if (stringutil.checkMobile(phone)&&code.length>0){
      loginEnable=true
    }
    this.setData({
      loginBtnDisable: !loginEnable,
      codeBtnDisable: !codeEnable||this.data.codeTime>0,
    })
  },
  login:function(){
    wx.login({
      success: res => {
        if (res.code) {
          
          baserequest.ztRequest(memberUrl.miniProgramRegister(5, res.code, this.data.phone, this.data.code, app.globalData.inviterOpenId, app.globalData.inviterUserId, app.globalData.inviterUserPhone, 1, !!app.globalData.inviterOpenId || !!app.globalData.inviterUserPhone), (data) => {
            usercache.setUserInfo(data)
            ChatUtil.login().then(() => { }).catch((err) => { })
            wx.navigateBack()
            app.loginSuccessCallback && app.loginSuccessCallback()
          }, (code) => {
          })
        } else {
          wx.showToast({ title: '获取用户信息失败', icon: 'none', duration: 1000 })
        }
      },
      fail:()=>{
        wx.showToast({ title: '获取用户信息失败', icon: 'none', duration: 1000 })
      }
    })
    

  },
  gototerm(){
    wx.navigateTo({
      url: '../../outLink/outLink?h5Url=' + encodeURIComponent(config().webDomain+ '/protocols.html')
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

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

})
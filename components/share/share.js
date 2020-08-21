// component/share/share.js
var stringutil = require('../../utils/stringutil.js')
var usercache = require('../../utils/usercache.js')
var baserequest = require('../../utils/baserequest.js')
var ownerUrl = require('../../configs/OwnerUrl.js')
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shareImage: String,
    shareContent: String,
    sharePage: String,
    shareUrl: String,
    // sharePYQImageParams: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    canSavePic:true,
    showSharePXQ:false,
  },
  pageLifetimes: {
    show() {
      // 页面被展示
      console.log('show=====', this.data.shareImage)
    },
    hide() {
      // 页面被隐藏
    },
    resize(size) {
      // 页面尺寸变化
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    closeShareView(){
      console.log('closeShareView')
      this.triggerEvent('myevent', {})
    },
    showSharePYQView(){
      this.setData({
        showSharePXQ: true
      })
    },
    getAuthcallback(res){
      console.log('res=========',res)
      if (res.detail.authSetting['scope.writePhotosAlbum']) {
        this.setData({
          canSavePic: true
        })
      }
    },
    savePic(){
      let _this = this
      console.log('3333333=====')
      wx.getSetting({
        success(res) {
          console.log('res=====', res)
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                _this.savePicToAlbum()
              },
              fail(){
                wx.showToast({
                  title: '需要保存到相册的权限',
                  icon: 'none',
                  duration: 2000
                })
                _this.setData({
                  canSavePic:false
                })
              }
            })
          }else{
            _this.savePicToAlbum()
          }
        },
        fail: function (err) {
          console.log('err=====',err)
        },
      })
    },

    savePicToAlbum() {
      let _this = this;
      var imgSrc = this.data.shareImage
      console.log('imgSrc===', imgSrc)
      var timestamp = (new Date()).valueOf()
      wx.downloadFile({
        url: imgSrc,
        header: {'content-type': 'image/jpeg',},
        success: function (res) {
          console.log(res);
          //图片保存到本地
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (data) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
              wx.login({
                success: res => {
                  if (res.code) {
                    baserequest.yixiaoRequest(ownerUrl.addShareRecord(
                      res.code,
                      1,
                      _this.data.shareContent,
                      _this.data.shareName,
                      _this.data.shareUrl,
                      1,
                      2
                    ), (data) => {

                    }, () => {

                    }, false)
                  }
                }
              })
              

              _this.closeShareView()
            },
            fail: function (err) {
              wx.showToast({
                title: '保存失败',
                icon: 'none',
                duration: 2000
              })
            },
            complete(res) {
              console.log(res);
            }
          })
        }
      })
    }

  },
  
})

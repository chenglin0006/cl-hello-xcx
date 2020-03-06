const baserequest=require("./baserequest.js");
const url=require("../configs/FurtureStoreUrl.js");
const app = getApp()
const setShop = (shopCode,shopName)=>{
  wx.setStorageSync('shopName', shopName);
  wx.setStorageSync('shopCode', shopCode);
}
const loaction=(callback)=>{  
    wx.getLocation({
        type: 'wgs84',
        success: function (res) {
            console.log(JSON.stringify(res))
            callback(res);
        },
        fail: function (res) {
            console.log('fail' + JSON.stringify(res));
            callback(res);
        }
     })
}
//获取附件门店
const getLocal=(longitude,latitude)=>{
    baserequest.request(url.getNearestShop(longitude,latitude), (result) => {
      console.log(result.data);
      if(wx.getStorageSync('shopCode')==""){
        wx.setStorageSync('shopName',result.data.shopName);
        wx.setStorageSync('shopCode',result.data.shopCode);
      }
      
    }, (code) => {
      console.log(code)
    })
}
const getUserLocation=(callback) =>{
    let _this = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
                //拒绝授权定位到上海龙阳店
                wx.setStorageSync('shopName','上海龙阳店');
                wx.setStorageSync('shopCode',1004);
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      loaction();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          loaction();
        }
        else {
          //调用wx.getLocation的API
          loaction(callback);
        }
      }
    })
  }

module.exports = {
  getUserLocation: getUserLocation,
  loaction: loaction,
  setShop: setShop
}
  
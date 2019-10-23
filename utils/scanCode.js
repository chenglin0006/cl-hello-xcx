const baserequest=require("./baserequest.js");
const url=require("../configs/FurtureStoreUrl.js");
const stringutil = require("./stringutil.js")

const scanning=()=>{
    wx.scanCode({
      success: (res) => {
        console.log(res);
        if(res.result){
          var itemsku = stringutil.getQueryString(res.result, 'itemsku')
          if (!!itemsku){
            wx.navigateTo({
              url: '/pages/goods/detail/detail?itemsku=' + itemsku
            })
          }else{
            baserequest.request(url.getProductByScanning(res.result, wx.getStorageSync('shopCode')), (data) => {
              if (data.data.itemId) {
                let itemId = data.data.itemId;
                wx.navigateTo({
                  url: '/pages/goods/detail/detail?itemId=' + itemId + '&skuId=' + skuId
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: '未找到该商品,如需购买请联系店内工作人员',
                  cancelText: '退出',
                  cancelColor: '#0377ff',
                  confirmText: '重新扫码',
                  confirmColor: '#0377ff',
                  success: (res) => {
                    if (res.confirm) {
                      scanning();
                    } else if (res.cancel) {
                      console.log('用户点击退出')
                    }
                  }
                })
              }

            }, (code) => {
              console.log(code)
            })
          }
          
        }
      },
      fail: (res) => {
        // wx.showToast({ title: res.errMsg, icon: 'none', duration: 1000 })
        console.log(res);
      }
    })
}
module.exports = {
    scanning: scanning,
}
  
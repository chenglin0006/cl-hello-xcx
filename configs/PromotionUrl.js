var config = require('./config.js')
var promotionUrl={
  /***
     * 根据sku获取活动信息：
     * @param skus skuCode
     */
  queryActivityInfo(skus, shopCode) {
    return {
      url: '/promotion/queryActivityInfo',
      type: 'GET',
      param: {
        skus,
        shopCode
      }
    }
  },
  /**
   * 根据手机号查积分
   */
  queryPointByMobile(mobile) {
    return {
      url: '/customer/point/queryByMobile',
      type: 'GET',
      param: {
        mobile
      }
    }
  },
  
}
module.exports = promotionUrl;
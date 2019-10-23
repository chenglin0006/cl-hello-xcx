var configData={
  environment: 'production',
  // environment: 'staging',
  // environment: 'dev',
  production:{
    ztDomain: 'https://zt.api.bnq.com.cn',//未来店订单相关,未来店购物车相关
    payDomain: 'https://zt.api.bnq.com.cn',
    furtureStoreDomain: 'https://item.bnq.com.cn',//未来店商品相关
    memberDomain: 'https://member.bnq.com.cn',//人脸识别登录，以及收货地址相关
    cmsDomain:'https://app.cms.bnq.com.cn',  //首页banner，爆款相关的接口
    areasDomain:'https://areas.bnq.com.cn/areas',//获取地址的信息
    webDomain:'https://zt.web.bnq.com.cn/',
    salesAdmin: 'https://sales.bnq.com.cn/salesAdmin',
    yingxiaoDomain:'https://yingxiao.bnq.com.cn',//人人营销
    wxAdimMarketDomain: 'https://wxadmin.market.bnq.com.cn',
    
    invoiceDomain: 'https://invoice.bnq.com.cn/invoiceAdmin/',//电子发票
    promotionDomain: 'https://promotion.bnq.com.cn/promotion-service',//促销中心

    pointDomain: 'https://customer.bnq.com.cn/customer',//积分、地址
    cardDomain: 'https://cart.bnq.com.cn/cartwebService',//购物车
  
    tradeDomain: 'https://trade.bnq.com.cn/trade-web',//交易链路：结算、下单、支付、售后
    // wxAdimMarketDomain: 'http://wxadmin-dev.market.bnq.com.cn'
    leanCloudAppId: 'CEMJjIxtsex2GUE31pMmwYfl-gzGzoHsz',
    leanCloudKey: 'Ue6G2VavGYm7axwKr3sMgXzz',
  },
  staging:{
    ztDomain: 'http://uat1.zt.bnq.com.cn',
    payDomain:'http://uat1.zt.bnq.com.cn',
    furtureStoreDomain: 'http://sales-test.bnq.com.cn',
    memberDomain: 'http://192.168.1.121:8080',
    cmsDomain: 'http://cms-test.bnq.com.cn',
    areasDomain:'http://areas-test.bnq.com.cn/areas',
    webDomain: 'http://uat1.zt.bnq.com.cn/',
    salesAdmin: 'https://sales-test-pre.bnq.com.cn/salesAdmin',
    yingxiaoDomain:'http://yingxiao-test.bnq.com.cn',
    wxAdimMarketDomain: 'http://wxadmin-dev.market.bnq.com.cn',

    invoiceDomain:'https://invoice-test.bnq.com.cn/invoiceAdmin/',//电子发票
    promotionDomain: 'http://promotion-test.bnq.com.cn/promotion-service',//促销中心
    pointDomain: 'http://customer-test.bnq.com.cn/customer',//积分
    cardDomain:'http://cart-test.bnq.com.cn/cartwebService/',//购物车
    tradeDomain:'https://trade-test.bnq.com.cn/trade-web',//交易链路：结算、下单、支付、售后
    leanCloudAppId: 'y7xBReL195sPfWIH6kiEnBsz-gzGzoHsz',
    leanCloudKey: '05U0OHEbc8CMe2hBt1MgWCEs',

  },
  dev:{
    ztDomain: 'http://dev.zt.bnq.com.cn',
    ztDomain: 'http://uat1.zt.bnq.com.cn',
    payDomain: 'http://dev.zt.bnq.com.cn',
    furtureStoreDomain: 'https://sales-dev.bnq.com.cn',
    memberDomain: 'http://192.168.1.121:8080',
    cmsDomain: 'http://cms-dev.bnq.com.cn',
    areasDomain: 'http://areas-dev.bnq.com.cn/areas',
    webDomain: 'http://dev.zt.bnq.com.cn/',
    salesAdmin: 'http://sales-dev.bnq.com.cn/salesAdmin',
    yingxiaoDomain:'http://yingxiao-dev.bnq.com.cn/',
    wxAdimMarketDomain: 'http://wxadmin-dev.market.bnq.com.cn',

    invoiceDomain: 'https://invoice-dev.bnq.com.cn/invoiceAdmin/',
    promotionDomain: 'http://promotion-dev.bnq.com.cn/promotion-service',//促销中心
    pointDomain: 'http://customer-dev.bnq.com.cn/customer',//积分、地址
    cardDomain: 'http://cart-dev.bnq.com.cn/cartwebService',//购物车
    tradeDomain: 'https://trade-dev.bnq.com.cn/trade-web',//交易链路：结算、下单、支付
  }
  
}
function config() {
  let data = {
    ...getConfigData(),
    isDev: isDev(),
  }
  return data;
}
function getConfigData(){
  return configData[configData.environment];
}
function isDev() {
  return configData.environment !== 'production'
}
module.exports = config
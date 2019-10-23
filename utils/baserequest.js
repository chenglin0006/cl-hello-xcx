var config=require('../configs/config.js')
var usercache = require('./usercache.js')
var resetUrl = require('./resetUrl.js')
var ChatUtil = require('../pages/chat/ChatUtil.js')
var NetworkErrorCode = {
  SESSION_WRONG: -3,       //会话过期
  SESSION_EXPIRED: -4,       //会话过期
  OTHER_CLIENT_LOGIN: -5     //用户被迫下线
};
var BaseRequest={
  /**
   * 未来店相关的请求（商品相关）
   */
  request(urlParam, successCB,failureCB,showLoading=true, showMessage=true){
    baseRequest(config().furtureStoreDomain, urlParam, successCB, failureCB, showLoading, showMessage)
  },
  /**
   * 用户相关的请求（地址相关）
   */
  memberRequest(urlParam, successCB, failureCB, showLoading = true, showMessage = true) {
    baseRequest(config().memberDomain, urlParam, successCB, failureCB, showLoading, showMessage)
  },
  /**
   * 中台相关的请求(订单相关)
   */
  ztRequest(urlParam, successCB, failureCB, showLoading = true, showMessage = true) {
    baseRequest(config().ztDomain, urlParam, successCB, failureCB, showLoading, showMessage)
  },
  /**
   * 订单详情(支付相关)
   */
  payRequest(urlParam, successCB, failureCB, showLoading = true, showMessage = true) {
    baseRequest(config().payDomain, urlParam, successCB, failureCB, showLoading, showMessage)
  },
  /**
   * cms相关的请求(首页banner，爆款列表)
   */
  cmsRequest(urlParam, successCB, failureCB, showLoading = true, showMessage = true) {
    baseRequest(config().cmsDomain, urlParam, successCB, failureCB, showLoading, showMessage)
  },
  /**
   * 地址相关的请求
   */
  areasRequest(urlParam, successCB, failureCB, showLoading = true, showMessage = true) {
    baseRequest(config().areasDomain, urlParam, successCB, failureCB, showLoading, showMessage)
  },
  /**
   * salesAdmin相关的请求
   */
  salesAdminRequest(urlParam, successCB, failureCB, showLoading = true, showMessage = true) {
    baseRequest(config().salesAdmin, urlParam, successCB, failureCB, showLoading, showMessage)
  },
  /*
   * 人人营销的请求
   */
  yixiaoRequest(urlParam, successCB, failureCB, showLoading = true, showMessage = true) {
    baseRequest(config().yingxiaoDomain, urlParam, successCB, failureCB, showLoading, showMessage)
  },
  /**
   * 营销中心的请求
   */
  wxAdimMarketRequest(urlParam, successCB, failureCB, showLoading = true, showMessage = true) {
    baseRequest(config().wxAdimMarketDomain, urlParam, successCB, failureCB, showLoading, showMessage)
  },
  /**
   * 电子发票的请求
   */
  invoiceRequest(urlParam, successCB, failureCB, showLoading = true, showMessage = true) {
    console.log('invoiceRequest',JSON.stringify(urlParam))
    baseRequest(config().invoiceDomain, urlParam, successCB, failureCB, showLoading, showMessage)
  },

/**
   * 促销中心的请求
   */
  promotionRequest(urlParam, successCB, failureCB, showLoading = true, showMessage = true) {
    console.log('promotionRequest', JSON.stringify(urlParam.param))
    baseRequest(config().promotionDomain, urlParam, successCB, failureCB, showLoading, showMessage)
  },
  /**
   * 购物车相关的请求
   */
  cardRequest(urlParam, successCB, failureCB, showLoading = true, showMessage = true) {
    console.log('cardRequest', JSON.stringify(urlParam.param))
    baseRequest(config().cardDomain, urlParam, successCB, failureCB, showLoading, showMessage)
  },
  /**
   * 积分相关的请求
   */
  pointRequest(urlParam, successCB, failureCB, showLoading = true, showMessage = true) {
    console.log('pointRequest', JSON.stringify(urlParam.param))
    baseRequest(config().pointDomain, urlParam, successCB, failureCB, showLoading, showMessage)
  },
  submitRequest(urlParam, successCB, failureCB, showLoading = true, showMessage = true) {
    console.log('submitRequest', JSON.stringify(urlParam.param))
    baseRequest(config().submitDomain, urlParam, successCB, failureCB, showLoading, showMessage)
  },
  /**
   * 交易链路：结算、下单、支付、订单中心、售后
   */
  tradeRequest(urlParam, successCB, failureCB, showLoading = true, showMessage = true) {
    console.log('tradeRequest', JSON.stringify(urlParam.param))
    baseRequest(config().tradeDomain, urlParam, successCB, failureCB, showLoading, showMessage)
  },
  
}
function baseRequest(domain, urlParam, successCB, failureCB, showLoading, showMessage){
  showLoading && wx.showLoading({ mask: true, title:'加载中...'})
  var TOKEN = usercache.getToken()
  var method = urlParam.type.toUpperCase() || 'GET';
  var requestUrl = (method === 'GET' ? makeUrl(urlParam) : urlParam.url);
  var url = domain + requestUrl + (requestUrl.indexOf('?') === -1 ? '?' : '&') + 'TOKEN=' + TOKEN;
  var param = method === 'GET' ? null : urlParam.param;
  var bnqUserAgent = {
    appVersion: '',
    buildVersion: '',
    networkStatus: '',
    adfa: 'df9e51fb-5a42-4ed6-a293',
    channel: '',
    mobileName: '',
    osVersion: '',
    reOsVersion: '',
    deviceType: '',
    apiVersion: '5',
    lat: '',
    lon: ''
  }
  wx.request({
    url: resetUrl(url), //仅为示例，并非真实的接口地址
    data: param ? JSON.stringify(param) : null,
    method: method,
    timeout: 55000,
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'bnqUserAgent': JSON.stringify(bnqUserAgent),
      "TOKEN": TOKEN,
      "BAJ_SESSION_ID": TOKEN,
      // "Cookie": "sessionToken=" + TOKEN
      "Cookie": "TOKEN=" + TOKEN + ";sessionToken=" + TOKEN
    },
    success(resultData) {
      showLoading && wx.hideLoading()
      var result = resultData.data
      var response = !!result.response ? result.response : result;
      if (!response) {
        failure(-100, '网络错误', showMessage,failureCB)
      }
      else if (response.code == 0 || response.ret == true) {
        var data = !!response.data ? response.data : response.result
        successCB&&successCB(data)
      }else{
        failure(response.code, response.message || response.msg || response.errmsg|| '网络请求失败', showMessage, failureCB, result)
      }
      //console.log('success', response)
      
    },
    fail(err){
      showLoading && wx.hideLoading()
      console.log('err', err)
      failure(-100, '网络错误', showMessage,failureCB)
    }
  })
}

function makeUrl(urlParam) {
  let { url, param } = urlParam;
  if (param) {
    url = url + (url.indexOf('?') === -1 ? '?' : '&')
    for (let key of Object.keys(param)) {
      url = url + encodeURIComponent(key) + '=' + encodeURIComponent(param[key]) + '&';
    }
    if (url.endsWith('&')) {
      url = url.substring(0, url.length - 1);
    }
  }
  return url;
}
function failure(code,message,isShowMessage,cb,data){
  if (isShowMessage){
    wx.showToast({ title: message, icon:'none', duration:1000})
  }
  if (code === NetworkErrorCode.SESSION_EXPIRED || code === NetworkErrorCode.OTHER_CLIENT_LOGIN || code === NetworkErrorCode.SESSION_WRONG){
    usercache.clear()
    ChatUtil.logout()
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }else{
    cb && cb(code, message, data)
  }
  
}
module.exports = BaseRequest; 
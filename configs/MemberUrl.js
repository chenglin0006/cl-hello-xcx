var config = require('./config.js')
var mebmerUrl={
  /***
     * 发送登录验证码
     * @param phone 手机号
     */
  sendVerifyCode(phone, picCode, clientType) {
    return {
      url: '/bnq_owner/apis/common/verifyCode/sendV3.do',
      type: 'GET',
      param: {
        phone,
        picCode,
        clientType
      }
    }
  },
  getGraphicCode(phone){
    let timestamp = (new Date()).valueOf()
    return config().ztDomain + '/bnq_owner/apis/common/validateCode.jpg?clientType=5&phone=' + phone + '&r=' + timestamp
  },
  /***
     * 用验证码进行登录
     * @param phone 手机号
     * @param verifyCode    验证码
     * @param clientType 客户端类型(1-ios,2-安卓,3-小程序)
     */
  loginByVerifyCode(phone, verifyCode, clientType) {
    return {
      url: '/bnq_owner/apis/auth/loginByVerifyCode.do',
      type: 'GET',
      param: {
        phone,
        verifyCode,
        clientType
      }
    }
  },
  /***
     * 获取用户信息
     */
  fetchOwnerInfo() {
    return {
      url: '/bnq_owner/mine/fetchOwnerInfo.do',
      type: 'POST',
    }
  },
  /*
     * 获取会员信息
     *
     */
  fetchMemberInfo() {
    return {
      url: '/bnq_owner/mine/getMemberInfo.do',
      type: 'GET',
    }
  },
  /**
   * 微信直接登录
   * clientType 客户端类型 微信商城 -5
   * jsCode 微信登录后的code
   */
  miniProgramLogin(clientType, jsCode) {
    return {
      url: '/bnq_owner/api/third/auth/miniProgramLogin.do',
      type: 'GET',
      param: {
        clientType,
        jsCode,
      }
    }
  },
  /**
   * 微信直接登录
   * clientType 客户端类型 微信商城 -5
   * jsCode 微信登录后的code
   * inviterOpenId=邀请人inviterOpenId
   * inviterUserId=邀请人userId
   * inviterUserPhone=邀请人手机号
   * promotionChannel=推广渠道1-微信商城
   * addRecordFlag=是否需要添加记录
   */
  miniProgramRegister(clientType, jsCode, phone, verifyCode, inviterOpenId, inviterUserId, inviterUserPhone, promotionChannel, addRecordFlag) {
    if (addRecordFlag){
      return {
        url: '/bnq_owner/api/third/auth/miniProgramRegister.do',
        type: 'GET',
        param: {
          clientType,
          jsCode,
          phone,
          verifyCode,
          inviterOpenId, inviterUserId, inviterUserPhone, promotionChannel, addRecordFlag
        }
      }
    }else{
      return {
        url: '/bnq_owner/api/third/auth/miniProgramRegister.do',
        type: 'GET',
        param: {
          clientType,
          jsCode,
          phone,
          verifyCode
        }
      }
    }
    
  },
  
  
}
module.exports = mebmerUrl;
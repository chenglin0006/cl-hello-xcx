// 
const usercache = {
  setUserInfo:function(info){
    try {
      wx.setStorageSync('user_info', info)
    } catch (e) { }
  },
  getUserInfo:function(){
    try {
      var value = wx.getStorageSync('user_info')
      if (value) {
        return value
      }else{
        return null
      }
    } catch (e) {
      return null
    }
  },
  getToken:function(){
    try {
      var value = wx.getStorageSync('user_info')
      if (value) {
        return value.token
      } else {
        return ''
      }
    } catch (e) {
      return ''
    }
  },
  getUserId: function () {
    try {
      var value = wx.getStorageSync('user_info')
      if (value) {
        return value.user.userId
      } else {
        return ''
      }
    } catch (e) {
      return ''
    }
  },
  getPhone: function () {
    try {
      var value = wx.getStorageSync('user_info')
      if (value) {
        return value.user.phone
      } else {
        return ''
      }
    } catch (e) {
      return ''
    }
  },
  isLogin:function(){
    try {
      var value = wx.getStorageSync('user_info')
      if (value) {
        return !!value.token
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  },
  clear:function(){
    try {
      wx.removeStorageSync('user_info')
      // ChatUtil.logout()
    } catch (e) {
      // Do something when catch error
    }
  }
}

module.exports = usercache
var StringUtil ={
    /***
     * 验证用户名 账号 验证规则：字母、数字、下划线组成，字母开头，4-16位。
     * @param str
     * @returns {boolean}
     */
   checkUser(str){
        let re = /^[a-zA-z]\w{3,15}$/;
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    /***
     * 验证手机号
     * @param mobile 手机 验证规则：11位数字，以1开头。
     * @returns {boolean}
     */
    checkMobile(mobile) {
        var re = /^1\d{10}$/
        if (re.test(mobile)) {
            return true;
        } else {
            return false;
        }
    },
    /*
     验证电话号码
     验证规则：区号+号码，区号以0开头，3位或4位
     号码由7位或8位数字组成
     区号与号码之间可以无连接符，也可以“-”连接
     如01088888888,010-88888888,0955-7777777
     */
    checkPhone(phone){
        let re = /^0\d{2,3}-?\d{7,8}$/;
        if (re.test(phone)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 隐藏手机号 180****9999
     */
    hidePhone(phone){
      return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },
    /*
     验证邮箱
     验证规则：姑且把邮箱地址分成“第一部分@第二部分”这样
     第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
     第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
     而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
     */
   checkEmail(email){
        let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if (re.test(email)) {
            return true;
        } else {
            return false;
        }
    },

    /***
     * 验证码密码
     * @param password 密码
     * @returns {boolean}
     */
    checkPwd(password){
        if(password&&password.length>=6&&password&&password.length<=20){
            return true;
        }else{
            return false;
        }
    },

    /***
     * 验证短信验证码
     * @param sms  短信验证码
     * @returns {boolean}
     */
    checkSmsCode(sms){
        if(sms){
            return true;
        }else{
            return false;
        }
    },
    checkAmount(amount){
        let re = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/
        if (re.test(amount)) {
            return true;
        } else {
            return false;
        }
    },

    /***
     * 综合七牛和阿里云oss设置图片
     */
    imageRest(url,width,height){
        let reusltUrl = ''
        if(!url){
          return ''
        }
        if(url.indexOf('http')===-1){
            return ''
        }
        if(url.indexOf("oss") != -1){
            reusltUrl = StringUtil.ossImageReset(url,width,height)
        }else{
            reusltUrl = StringUtil.qiniuImageReset(url,width,height,false)
        }
        return reusltUrl
    },
    qiniuImageReset(url,width,height, isVideo = false){
        width=parseInt(width)*2
        height=parseInt(height)*2
        let use =url.indexOf('?')===-1?'?':'/'
        if (isVideo)
        {
            return url + use + 'vframe/jpg/offset/0/w/' + width + '/h/' + height;
        }

        if(height>0){
            let type = isVideo ? 'vframe/jpg/offset/0/w/' : 'imageView2/1/size-limit/300k/quality/100/w/';
            return url+use+type+width+'/h/'+height
        }else{
            let type = isVideo ? 'vframe/jpg/offset/0/w/' : 'imageView2/0/size-limit/300k/quality/100/w/';
            return url+use+type+width
        }
        // return url+use+'imageMogr2/thumbnail/'+width+'x'
    },

    /***
     * OSS图片缩略设置
     * @param url  目标Url
     * @param width 需要的宽
     * @param height 需要的高（可以不设，不设置的话就按照原比例缩放）
     * @returns {string}
     */
    ossImageReset(url,width,height){
        let max_width = 1024
        width=parseInt(width)
        height=parseInt(height)
        if (width>max_width){
            if(height>0){
                height=parseInt(height*max_width/width)
            }
            width = max_width
        }
        let use =url.indexOf('?')===-1?'?':'&'
        if(height>0){
            let resize = 'x-oss-process=image/sharpen,100/resize,m_fill,h_'+height+',w_'+width
            return url+use+resize
        }else{
            let resize = 'x-oss-process=image/sharpen,100/resize,w_'+width
            return url+use+resize
        }
    },

    getQueryString(url,name)
    {
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        let search = url.split('?')
        if(search.length>1){
            let r = search[1].match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        }
        return null

    },
    /***
     * 验证密码是否合法 6-20位字符（包含数字和字母）
     * @param password
     * @returns {boolean}
     */
    checkPsw(password) {
        if(password&&password.length>=6&&password&&password.length<=20){
            var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
            if (reg.test(password)) {
                return true
            }
        }
        return false;
    },
    checkIsInt(str)
    {
        let re = /^[1-9]+[0-9]*]*$/
        return re.test(str)
    },
    /**
     * 组合url 和参数
     */
  makeUrl(url, param) {
    if (!!param && Object.keys(param).length>0) {
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
};
module.exports = StringUtil;
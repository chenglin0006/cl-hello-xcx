var md5 = require('./md5.js')
var key = 'wechat_shop'
var secret = 'c1cf9ed1b74d838c7801d524f480cc51'
var resetUrl = function (url) {
  var keyUrl = addNewParam(url, 'key', key)
  var timestamp = (new Date()).valueOf()
  var timeUrl = addNewParam(keyUrl, 'timestamp', timestamp)
  var signUrl = addNewParam(timeUrl, 'sign', '')
  var sortedParams = urlSearchAndSortParam(signUrl)
  var sign = getSign(sortedParams, timestamp)
  return signUrl+sign
}
function addNewParam(url,key,value){
  return (url + (url.indexOf('?') === -1 ? '?' : '&') + key + '=' + value);
}
function getSign(params,timestamp){
  return md5.hex_md5(secret + timestamp + params.join('') + secret)
}
function compare(value1,value2) {
  return value1.toLowerCase() > value2.toLowerCase()
}
function urlSearchAndSortParam(url) {
  var name, value;
  var str = url; //取得整个地址栏
  var num = str.indexOf("?")
  str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
  var arr = str.split("&"); //各个参数放到数组里
  var paramArr = []
  for (var i = 0; i < arr.length; i++) {
    num = arr[i].indexOf("=");
    if (num > 0) {
      name = arr[i].substring(0, num);
      paramArr.push(name.toLowerCase())
    }
  }
  return paramArr.sort()
}
module.exports = resetUrl
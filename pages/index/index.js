//index.js
//获取应用实例
const app = getApp()
var baserequest = require("../../utils/baserequest.js")
var url = require('../../configs/FurtureStoreUrl.js')
const locationUtil = require('../../utils/locationUtil.js');
var stringutil = require('../../utils/stringutil.js')
let isFirstInit = true;
var Tools = require('../../utils/util');

let hotJson = require('./json/hotJson').default;
let shopCodeJson = require('./json/shopCode').default;
let brandJson = require('./json/brandData').default;

Page({
  data: {
    totalNum: 1,
    brandList: [],
    hotSkuList: [],
    tagList:[{
        id: 'jiazhuang',
        name: '家装全案设计',
        mainPic: './images/jiazhuang.png',
    }, {
        id: 'yuanchuang',
        name: '原创设计展',
        mainPic: './images/yuanchuang.png',
    }, {
        id: 'vr',
        name: 'VR体验',
        mainPic: './images/vr.png',
    }, {
        id: 'fengshui',
        name: '家居风水',
        mainPic: './images/fengshui.png',
    }, {
        id: 'pinpai',
        name: '品牌展馆',
    }, {
        id: 'baopin',
        name: '爆品秒杀',
    }],
    cityName:'武汉',
    latitude: 23.099994,
    longitude: 113.324520,
  },
  //事件处理函数
  bindViewTap: function(event) {
    let sapSkuNoFlag = event.currentTarget.dataset.brand;
    wx.navigateTo({
      url: '../signUp/index?sapSkuNo='+sapSkuNoFlag
    }) 
  },
  onLoad: function () {
    // this.getLocation();
    locationUtil.getUserLocation((res)=>{
      this.setData({
        latitude:res.latitude,
        longitude:res.longitude,
      })
    })
    this.initData();
    this.getTotalNumber();
  },

  initData: function(e){
    let cityName  = this.data.cityName;
    let skuListStr = this.initJsonData(cityName);
    let shopCode = '';
    let shopCodeList = this.initCityJson();
    let cityBrandList = this.initBrandData(cityName);
    var brandListTemp = [];
    for(var i=0;i<cityBrandList.length;i+=3){
      brandListTemp.push(cityBrandList.slice(i,i+3));
    }
    shopCodeList.forEach((ele)=>{
        if(cityName.indexOf(ele.city)!==-1){
            shopCode = ele.shopCode;
        }
    })
    this.getHotSkuList(shopCode,skuListStr);
    this.setData({
      brandList:brandListTemp
    })
  },

  getHotSkuList: function(shopCode,sapSkuCodes){
    let _this = this;
    baserequest.request(url.jbhSkuCollection(shopCode, sapSkuCodes), (result) => {
      isFirstInit = false;
      const respData = result.data;
      const skuParams = sapSkuCodes.split(',');
      let skuObj = {}
      let noInfo = [];
      skuParams.forEach((s) => {
          let list = [];
          respData.forEach((ele, index) => {
              ele.skuDtoList.forEach((i) => {
                  if (i.sapSkuNo && s &&`${i.sapSkuNo}` === `${s}`) {
                      list.push(Tools.deepClone(ele));
                  }
              });
          });
          if(list.length>0){
              list[0].sapSkuNoFlag = s;
              skuObj[s]=list[0];
          } else {
              console.log('没有返回信息的商品:',s);
              noInfo.push(s);
          }
      });
      const arr = [];
      skuParams.forEach((ele)=>{
          if(skuObj[ele]){
              arr.push(skuObj[ele]);
          }
      })
      var data = [];
      var obj = {};
      var reapeatData=[];
      for(var i =0; i<arr.length; i++){
          if(!obj[arr[i].id]){
              data.push(arr[i]);
              obj[arr[i].id] = true;
          } else {
              reapeatData.push(arr[i].id+'-'+arr[i].sapSkuNoFlag);
              console.log('重复了的商品:',arr[i].id+'-'+arr[i].sapSkuNoFlag);
          }
      }
      hotJson.forEach((ele)=>{
          data.forEach((i)=>{
              if(ele.sku&&ele.sku === i.sapSkuNoFlag){
                  i.nowPrice = ele.activityPrice;
                  i.beforePrice = ele.realPrice;
              }
          })
      })
      _this.setData({
        hotSkuList:data
      })
    }, (code) => {
      console.log(code)
      isFirstInit = true
      }, false, true)
  },

  initJsonData: function(cityName){
      let hotSkuList = [];
      hotJson.forEach((ele)=>{
          if(ele.allCountry==='是' && ele.notInCitys===''){
              hotSkuList.push(ele);
          } else if(ele.allCountry==='是' && ele.notInCitys){
              let notInCityList = ele.notInCitys.split(',');
              //当前城市不包含在notInCitys里面
              let hasFlag=false;
              notInCityList.forEach((i)=>{
                  if(cityName.indexOf(i)>-1 || i.indexOf(cityName)>-1){
                      hasFlag = true;
                  }
              })
              if(!hasFlag){
                  hotSkuList.push(ele);
              }
          } else if(ele.citys){
              let cityList = ele.citys.split(',');
              let hasFlag=false;
              cityList.forEach((i)=>{
                  if(cityName.indexOf(i)>-1 || i.indexOf(cityName)>-1){
                      hasFlag = true;
                  }
              })
              if(hasFlag){
                  hotSkuList.push(ele);
              }
          }
      })
      let skuList = [];
      hotSkuList.forEach((ele)=>{
          if(ele.sku){
              skuList.push(ele.sku);
          }
      })
      return skuList.join(',')
  },

  initCityJson: function(e){
      let shopCodeList = [];
      Object.keys(shopCodeJson).forEach((ele)=>{
          let obj = shopCodeJson[ele];
          obj.city = ele;
          shopCodeList.push(obj);
      })
      return shopCodeList;
  },

  initBrandData: function(cityName){
    let brandList = [];
    brandJson.forEach((ele)=>{
        if(ele.allCountry==='是' && ele.notInCitys===''){
            brandList.push(ele);
        } else if(ele.allCountry==='是' && ele.notInCitys){
            let notInCityList = ele.notInCitys.split(',');
            //当前城市不包含在notInCitys里面
            let hasFlag=false;
            notInCityList.forEach((i)=>{
                if(cityName.indexOf(i)>-1 || i.indexOf(cityName)>-1){
                    hasFlag = true;
                }
            })
            if(!hasFlag){
                brandList.push(ele);
            }
        } else if(ele.citys){
            let cityList = ele.citys.split(',');
            let hasFlag=false;
            cityList.forEach((i)=>{
                if(cityName.indexOf(i)>-1 || i.indexOf(cityName)>-1){
                    hasFlag = true;
                }
            })
            if(hasFlag){
                brandList.push(ele);
            }
        }
    })
    brandList.forEach((ele,index)=>{
        ele.noStr ='NO:'+(1111+index);
    })
    return brandList;
},
  getTotalNumber: function(e) {
    let _this = this;
    baserequest.jbhRequest({
      type:'get',
      param: null,
      url: '/dcmall-api-server/app/appExpoInterest/countOrderByWay/1242'
    }, (result) => {
      

    }, (code) => {
      console.log(code)
      isFirstInit = true
      }, false, true)
  },
})

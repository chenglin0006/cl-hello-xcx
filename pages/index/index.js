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
let cityListData = require('../index/json/cityJson').default;

Page({
  data: {
    totalNum1:0,
    totalNum2:0,
    totalNum3:0,
    cityEnum:cityListData,
    targetCity:'',
    showLoading:false,
    brandList: [],
    hotSkuList: [],
    tagList:[{
        id: 'jiazhuang',
        name: '家装全案设计',
        mainPic: 'https://res1.bnq.com.cn/0bb61f6f-6f17-4189-9ebd-12820475259b?t=1586255888868',
    }, {
        id: 'yuanchuang',
        name: '原创设计展',
        mainPic: 'https://res1.bnq.com.cn/780a3921-6e84-40f8-a1e4-e40d32905cf5?t=1586255936867',
    }, {
        id: 'vr',
        name: 'VR体验',
        mainPic: 'https://res1.bnq.com.cn/76e0bea3-2f50-45ce-8ff0-27544d8510fe?t=1586255969307',
    }, {
        id: 'fengshui',
        name: '家居风水',
        mainPic: 'https://res1.bnq.com.cn/92d2dc05-df85-4cb6-8dba-d7c605a72cfc?t=1586255992741',
    }, {
        id: 'pinpai',
        name: '品牌展馆',
    }, {
        id: 'baopin',
        name: '爆品秒杀',
    }],
    cityName:'上海',
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

  bindCityChange: function(e) {
      let {cityEnum} = this.data;
    this.setData({
        targetCity: e.detail.value,
        showLoading: true
    })
    this.initData(cityEnum[e.detail.value]);
},

  onShow: function () {
      let {cityEnum,cityName} = this.data;
    locationUtil.getUserLocation((res)=>{
      this.setData({
        latitude:res.latitude,
        longitude:res.longitude,
      })
    })
    cityEnum.forEach((ele, index) => {
        if(ele === cityName){
            this.setData({
                targetCity:index,
            })
        }
    })
    this.initData(cityName);
    this.getTotalNumber();
  },

  initData: function(cityName){
    app.globalData.cityName = cityName;
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
        hotSkuList:data,
        showLoading:false
      })
    }, (code) => {
      console.log(code)
      isFirstInit = true
      _this.setData({
        showLoading:false
      })
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
        let totalNum = result.data;
        this.setData({
            totalNum1:(totalNum*16.13+5000).toFixed(),
            totalNum2:(totalNum*6.43+2000).toFixed(),
            totalNum3:(totalNum*11.32+3000).toFixed(),
        })
    }, (code) => {
      console.log(code)
      isFirstInit = true
      }, false, true)
  },
})

const app = getApp()
var md5 = require('../../utils/md5.js')
var baserequest = require("../../utils/baserequest.js")
var url = require('../../configs/FurtureStoreUrl.js')
const locationUtil = require('../../utils/locationUtil.js');
var stringutil = require('../../utils/stringutil.js')
let isFirstInit = true;
var Tools = require('../../utils/util');

let hotJson = require('../index/json/hotJson').default;
let shopCodeJson = require('../index/json/shopCode').default;
let brandJson = require('../index/json/brandData').default;
let cityListData = require('../index/json/cityJson').default;
let cityShopData = require('../index/json/cityShop').default;

Page({
    data: {
        test:123123,
        targetCity: null,
        targetShop: null,
        cityName:'上海',
        cityEnum:cityListData,
        shopList:[],
        username:'',
        telephone:''
    },
    onLoad: function (options) {
        console.log(options, app.globalData.cityName, '------');
        const cityName = app.globalData.cityName;
        this.initCityShopList(cityName);
        cityListData.forEach((ele,index) => {
            if(cityName.indexOf(ele) > -1){
                this.setData({
                    targetCity: index
                })
            }
        })
    },
    bindCityChange: function(e) {
        this.setData({
            targetCity: e.detail.value
        })
        this.initCityShopList(this.data.cityEnum[e.detail.value]);
    },
    bindShopChange: function(e) {
        this.setData({
            targetShop: e.detail.value
        })
    },
    validate( { username, telephone } ) {
        if (!username) {
          wx.showToast({
            title: '联系人不能为空',
            duration: 1000,
            icon: 'none',
          })
          return false;
        }
        if (!telephone) {
          wx.showToast({
            title: '手机号不能为空',
            duration: 1000,
            icon: 'none',
          })
          return false;
        }
        if (!this.data.targetCity&&this.data.targetCity!==0) {
          wx.showToast({
            title: '城市不能为空',
            duration: 1000,
            icon: 'none',
          })
          return false;
        }
        return true;
    },
    formSubmit: function(e){
        const {targetCity,targetShop,shopList} = this.data;
        if (!this.validate(e.detail.value)) {
            return;
        }
        let params = {
            way: 1242, //家博会
            cityName: cityListData[targetCity],
            phone: e.detail.value.telephone,
            couponCode: md5.hex_md5(e.detail.value.telephone).toString().slice(3, 18),
            targetId: -1,
            name: '测试' || e.detail.value.username,
            type: 3,
            shopName: targetShop&&shopList[targetShop]&&shopList[targetShop].name || '',
            deviceCode: "h5",
            sourceUrl:this.route
        };
        baserequest.jbhRequest({
        type:'post',
        param: params,
        url: '/dcmall-api-server/app/appExpoInterest/create'
        }, (result) => {
            wx.showToast({
                title: '报名成功',
                icon: 'none',
                duration: 1000
            });
            setTimeout(() => {
                wx.navigateBack({
                    delta: 1
                });
            },1000)
        }, (code) => {
            console.log(code)
            if(code === 6) {
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1
                    });
                },1000)
            }
        }, true, true)
    },
    bindRegionChange: function(){

    },
    inputChangeHandler: function(e){
        this.setData({
            [e.target.id]: e.detail.value
        })
    },
    initCityShopList: function(cityName) {
        let list = [];
        cityShopData.forEach((ele)=>{
            if(list.indexOf(ele.city)===-1){
                list.push(ele.city);
            }
        })
        let arry = []
        list.forEach((ele)=>{
            let obj = {
                city:ele,
                shops:[],
            }
            cityShopData.forEach((i)=>{
                if(i.city === ele){
                    obj.shops.push({
                        name:i.shopName,
                        id:i.shopName
                    });
                }
            })
            arry.push(obj);
        })

        arry.forEach((ele)=>{
            if(cityName.indexOf(ele.city)>-1){
                this.setData({shopList:ele.shops});
            }
        })
        console.log(this.data.shopList,'-----');
    },
})
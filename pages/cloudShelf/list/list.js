// pages/cloudShelf/list/list.js
const app = getApp()
var baserequest = require("../../../utils/baserequest.js")
var url = require('../../../configs/FurtureStoreUrl.js')
var Util = require('../../../utils/util.js');
var WxSearch = require('../wxSearchView/wxSearchView.js');
var stringutil = require('../../../utils/stringutil.js')
var shareUtil = require('../../../utils/shareUtil.js')
var UserCache = require('../../../utils/usercache.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    goodsList: [], //商品列表
    saleCategoryId: '',
    shopCode: '',
    keyword: '',
    curPage: 1,
    pageSize: 10,
    isDiscount: '',
    toShow: false,
    isLoaded: false,
		brandList: [], // 品牌列表
		brandIds: [], // 已选择品牌
    sort: '',
    moveViewLeft: wx.getSystemInfoSync().windowWidth - 60,
    moveViewTop: wx.getSystemInfoSync().windowHeight - 70,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      if (options.isFromSearch) {
        wx.setNavigationBarTitle({
          title: '搜索'
        })
      } else if (!!options.categoryName) {
        wx.setNavigationBarTitle({
          title: options.categoryName
        })
      } else if (!!options.brandName) {
        wx.setNavigationBarTitle({
          title: options.brandName
        })
      } else {
        wx.setNavigationBarTitle({
          title: '云货架'
        })
      }
      this.setData({
        searchValue: options.searchValue ? options.searchValue : '',
        saleCategoryId: options.saleCategoryId ? options.saleCategoryId : '',
        keyword: options.searchValue ? options.searchValue : '',
        brandIds: options.brandIds ? options.brandIds : '',
        brandName: options.brandName ? options.brandName : '',
        brandActive: options.brandActive ? options.brandActive : '',
        brandIcon: options.brandIcon ? decodeURIComponent(options.brandIcon) : '',
        activityId: options.activityId ? options.activityId : '',
      });

    }
    // 2 搜索栏初始化
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      [], // 热点搜索推荐，[]表示不使用
      [],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );

    this.getAllGoods(this.data.curPage, true);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (UserCache.isLogin()) {
      let { headPicUrl, userName } = UserCache.getUserInfo().user
      this.setData({
        headPicUrl,
        userName,
      })
    }
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.toShow) return;
    this.getAllGoods(parseInt(this.data.goodsList.length / this.data.pageSize) + 1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return shareUtil.commonShareData()
  },

  // 搜索入口
  wxSearchTab: function () {
    wx.navigateTo({
      url: '../search/search?fromlist=1'
    })
  },

  // 3 转发函数，固定部分，直接拷贝即可
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数
  wxSearchCancel: WxSearch.wxSearchCancel,

  // 4 搜索回调函数
  mySearchFunction: function (value) {
    // 搜索商品
    this.getAllGoods(this.data.curPage, true);
  },

  // 5 返回回调函数
  myGobackFunction: function () {
    console.log('myGobackFunction')
    // do your job here
    // 示例：返回
    wx.redirectTo({
      url: '../list/list?searchValue=返回'
    })
  },

  // 搜索列表
  getAllGoods: function (curPage, isReset = false) {
    const shopCode = wx.getStorageSync('shopCode');
    const {
      saleCategoryId,
      keyword,
      pageSize,
      isDiscount,
      activityId,
			brandIds,
			sort,
    } = this.data;
    const params = {
      saleCategoryId,
      shopCode,
      keyword,
      curPage,
      pageSize,
      isDiscount,
      activityId,
      brandIds,
      sort,
    };
    baserequest.request(url.getGoodsItems(params), (response) => {
			const data = response.data;
			const brandList = data.brandList;
      let goodsList = data.seItemList.map((item) => ({
				...item,
				listImg: stringutil.imageRest(item.listImg, wx.getSystemInfoSync().windowWidth / 2, wx.getSystemInfoSync().windowWidth / 2),
			}));
      goodsList = isReset ? goodsList : this.data.goodsList.concat(goodsList);
      this.setData({
        goodsList,
        toShow: goodsList.length == pageSize ? false : true,
        isLoaded: true
			});
			if (brandList.length !== this.data.brandList.length) {
				this.setData({ brandList });
			}
    }, (code) => {
      console.log(code)
    }, false, true);
  },

  // 已选择品牌
  handleSelectedBrand(e) {
    const selectedBrandList = e.detail;
		console.log('selectedBrandList', selectedBrandList);
		this.setData(
			{ brandIds: selectedBrandList.map(item => item.id) },
			() => {
				this.getAllGoods(1, true);
			}
		);
	},
	
	// 已选择排序
	handleSelectedSort(e) {
		const item = e.detail;
		this.setData(
			{ sort: item.sortCode },
			() => {
				this.getAllGoods(1, true);
			}
		);
	},
})
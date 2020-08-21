// pages/goods/promotion/promotion.js
var baserequest = require("../../../utils/baserequest.js")
var url = require('../../../configs/FurtureStoreUrl.js')
var stringutil = require('../../../utils/stringutil.js')
var { checkLogin } = require('../../../utils/checkLogin.js')
let timeout = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    promotionData: {},
    goodsList: [],
    toShow: true,
    isLoaded: false,
    shopCode: '',
    keyword: '',
    curPage: 1,
    pageSize: 20,
    brandList: [], // 品牌列表
		brandIds: [], // 已选择品牌
    sort: '',
    countDown: { hour: '00', minute: '00', second: '00' },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const promotionData = JSON.parse(options.itemPromotion);
    this.setData(
      { promotionData: promotionData }, 
      () => {
        this.getAllGoods(this.data.curPage, true);
      }
    );
    if (promotionData.isActivity) {
      const { startTime } = promotionData;
      timeout = setInterval(() => {
        const nowTime = new Date().getTime();
        const timeRemaining = new Date(startTime - nowTime);
        const day = timeRemaining.getDay();
        const hour = timeRemaining.getHours();
        const minute = timeRemaining.getMinutes();
        const second = timeRemaining.getSeconds();
        const formatTime = (time) => (time < 10 ? '0' + time : time.toString()).split('');
        console.log('countDown', `${day}:${hour}:${minute}:${second}`);
        this.setData({ countDown: { hour: formatTime(hour), minute: formatTime(minute), second: formatTime(second) } });
      }, 1000);
    }
    console.log('promotion--options', promotionData)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(timeout);
  },
  
  //搜索列表
  getAllGoods: function (curPage, isReset = false) {
    const shopCode = wx.getStorageSync('shopCode');
    const {
      keyword,
      pageSize,
      isDiscount,
      promotionData,
      brandIds,
      sort,
    } = this.data;
    const params = {
      shopCode,
      keyword,
      curPage,
      pageSize,
      isDiscount,
      activityId: promotionData.id,
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

  // 滚动到底部触发再次请求
  handleScrollToLower() {
    if (this.data.toShow) return;
    this.getAllGoods(parseInt(this.data.goodsList.length / this.data.pageSize) + 1);
  },

  // 搜索框输入时候操作
  wxSearchInput(e) {
    var inputValue = e.detail.value;
    this.setData({
      keyword: inputValue
    })
  },

  wxSearchConfirm(options) {
    this.getAllGoods(this.data.curPage, true);
  },

  wxSearchCancel() {
    this.setData({
      keyword: ''
    }, () => {
      this.getAllGoods(this.data.curPage, true);
    })

  },

  goToCart() {
    checkLogin(() => {
      wx.switchTab({
        url: '../../shoppingcard/card/card'
      })
    })
  },

  onSelectedTagCallback(args) {
    console.log('onSelectedTagCallback', args)
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
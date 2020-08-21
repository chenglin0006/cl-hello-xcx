/**
 * Created by user on 16/6/6.
 */
var config = require('./config.js')
var FurtureStoreUrl = {
  /**
   * 获取省市区
   */
  getAreas() {
    return {
      url: '/area/allAreas',
      type: 'GET',
      param: {}
    }
  },
  /**
   * 获取所有省份
   */
  getAreasDistrictProvinces() {
    return {
      url: '/cutomer/area/district/provinces',
      type: 'GET',
      param: {}
    }
  },
  /**
   * 获取所有市
   * @param provinceId 省id
   */
  getAreasDistrictCitys(provinceId) {
    return {
      url: '/cutomer/area/district/citys',
      type: 'GET',
      param: {
        provinceId: provinceId
      }
    }
  },
  /**
   * 获取所有区
   * @param cityId 市的id
   */
  getAreasDistrictDistricts(cityId) {
    return {
      url: '/cutomer/area/district/districts',
      type: 'GET',
      param: {
        cityId: cityId
      }
    }
  },
  /**
   * 获取所有街道
   * @param districtId 区的id
   */
  getAreasStreetStreets(districtId) {
    return {
      url: '/cutomer/area/street/streets',
      type: 'GET',
      param: {
        districtId: districtId
      }
    }
  },
  /***
   * 获取分类信息
   * @returns {{url: string, type: string, param: {}}}
   */
  getCategory() {
    return {
      url: '/category/sale/fs',
      type: 'GET',
      param: {}
    }
  },
  /**
   * 家博会爆品列表
   * @param terminalType 10 小程序，
   */
  jbhSkuCollection(shopCode, sapSkuCodes) {
    return {
      url: '/items/list',
      type: 'get',
      param: {
        shopCode, sapSkuCodes,curPage:1,pageSize:sapSkuCodes.split(',').length
      }
    }
  },
  /***
   * 获取商品列表
   * @param queryCategoryId 选择的前台类目
   * @param shopId 店铺ID
   * @param keyword  搜索关键字
   * @param isDiscount 是否满减 1是，0否
   * @param activity 活动id
   * @param brandIds 品牌id
   * @param sort 排序
   */

  getGoodsItems(params) {
    const param = {};
    for (const key in params) {
      if (params[key] !== undefined) {
        param[key] = params[key];
      }
    }
    if (params.isDiscount === 1) {
      param.isDiscount = 1;
    }
    if (params.keyword || params.saleCategoryId === 0) {
      delete param.saleCategoryId;
    }

    return {
      url: '/items/searchList',
      type: 'GET',
      param: param
    }
  },
  /***
   * 获取商品详情
   * @param itemId 商品ID
   */
  getGoodsDetail(itemId, skuId = '') {
    return {
      url: '/item/new/detail',
      type: 'GET',
      param: {
        itemId: itemId,
        skuId: skuId
      }
    }
  },
  /***
   * 获取商品详情
   * @param itemSkuId 商品itemSkuId
   */
  queryByItemSkuId(itemSkuId) {
    return {
      url: '/item/new/detail/queryByItemSkuId',
      type: 'GET',
      param: {
        itemSkuId: itemSkuId,
      }

    }
  },
  /***
   * 获取商品详情
   * @param sapSku sapSku
   * @param shopCode 门店code
   */
  queryBySapskuAndShopcode(sapSkuNo, shopCode) {
    return {
      url: '/item/new/detail/queryBySapSkuNoAndShopCode',
      type: 'GET',
      param: {
        sapSkuNo: sapSkuNo,
        shopCode: shopCode
      }
    }
  },
  /**
   * 获取门店列表
   * @returns {{url: string, type: string, param: {}}}
   */
  getStoreList() {
    return {
      url: '/shop/queryFuturnShop',
      type: 'GET',
      param: {

      }
    }
  },
  /***
   * 增加商品到购物车
   * productType 1:普通商品 2：议价商品 p 3：定制商品
   * @returns {{url: string, type: string, param: {}}}
   */
  // {
  //     "shopId": 847,
  //     "itemId": 1053,
  //     "itemCode": "209",
  //     "skuId": 15917,
  //     "skuCode": "11086",
  //     "sapSku": "456789",
  //     "quantity": "5",
  //     "note": "备注",
  //     "skuRelations": [{
  //     "serviceItemId": "",
  //     "serviceItemCode": "",
  //     "serviceSkuId": "",
  //     "serviceSkuCode": "11086",
  //     "serviceQuantity": 1,
  //     "serviceNote": "备注"
  // }]
  // }
  /**
   * 加入购物车
   * @param productType 1:普通商品 2：议价商品 3：定制商品
   */
  addItemToCart(unitCode, shopCode, shopId, itemId, itemCode, skuId, skuCode, sapSku, quantity, note, productType = '1', skuRelations) {
    return {
      url: '/cart/addItemToCart',
      type: 'POST',
      param: {
        unitCode, shopCode, shopId, itemId, itemCode, skuId, skuCode, sapSku, quantity, note, productType, skuRelations
      }

    }
  },
  /**
   * 获取购物车数据
   * @param shopCode 门店编号
   * @returns {{url: string, type: string, param: {userId: string}}}
   */
  getCartItemList(shopCode) {
    return {
      url: '/cart/getCartItemList',
      type: 'GET',
      param: {
        shopCode
      }
    }
  },
  /**
   * 删除购物车中宝贝
   * @param id
   * @returns {{url: string, type: string, param: {id: *}}}
   */
  deleteItemFormCart(ids) {
    console.log('deleteItemFormCart', ids)
    return {
      url: '/cart/deleteItemFormCart',
      type: 'POST',
      param: {
        cartItemIds: ids,
      }
    }
  },
  /**
   * 编辑购物车中宝贝
   * @param id
   * @param quantity
   * @param note
   * @returns {{url: string, type: string, param: {id: *, quantity: *, note: *}}}
   */
  editItemFormCart(cartItemEditList) {
    return {
      url: '/cart/editItem',
      type: 'POST',
      param: {
        editVOS: cartItemEditList,
      }
    }
  },
  /**
   * 结算
   * @param id
   * @returns {{url: string, type: string, param: {id: *}}}
   */
  commitCart(channelType, shopCode, customerMobile, orderItemList, receiverDistrictCode, cartItemIds, receiverAddressId) {
    return {
      // url: '/http-api/futureShop/promotionQuery.do',
      url: '/order/orderSettle',
      type: 'POST',
      param: {
        // shopCode,
        // datTransbegin,
        // customerMobile,
        // pay_fee,
        // articles: articles,
        channelType,
        shopCode,
        customerMobile,
        orderItemList,
        receiverDistrictCode,
        cartItemIds,
        receiverAddressId
      }
    }
  },
  /**
   * 线下提交订单
   * @param id
   * @param source 值'wc'：表示渠道来源是微信小程序
   * @returns {{url: string, type: string, param: {id: *}}}
   */
  commitOrder(baseInfo, orderItemList, cartItemIds, couponCodeList, energySubsidy) {
    return {
      // url: '/http-api/futureShop/orderPosPay.do',
      url: '/order/submit',
      type: 'POST',
      param: {
        // buyerRemark: baseInfo.buyerRemark,
        // // userId: baseInfo.userId,
        // customerId: baseInfo.customerId,
        // customerMobile: baseInfo.customerMobile,
        // shopCode: baseInfo.shopCode,
        // posNo: baseInfo.posNo,
        // cmFlag: baseInfo.cmFlag,
        // bizSubType: baseInfo.bizSubType,
        // terminalType: baseInfo.terminalType,
        // receiverAddressId: baseInfo.receiverAddressId,
        // estimatedDeliveryTime: baseInfo.estimatedDeliveryTime,
        // installTime: baseInfo.installTime,
        // paymentType: baseInfo.paymentType,
        // paymentSource: baseInfo.paymentSource,
        // paymentWay: baseInfo.paymentWay,
        // pointDeductionAmount: baseInfo.pointDeductionAmount,
        // paymentAccount: baseInfo.paymentAccount,
        // channelType: baseInfo.channelType,
        ...baseInfo,
        couponCodeList: couponCodeList,
        cartItemIds: cartItemIds,
        orderItemList: orderItemList,
        ...energySubsidy
      }
    }
  },
  /**
   * 统一下单
   */
  doPay(data) {
    return {
      url: '/payment/doPay',
      type: 'POST',
      param: {
        data
      }
    }
  },
  /**
   * 线上提交订单
   * @param id
   * @param source 值'wc'：表示渠道来源是微信小程序
   * @returns {{url: string, type: string, param: {id: *}}}
   */
  commitOnLineOrder(phone, store_code, source, orders, repeatToken, marketingUserId, marketingUserPhone, marketingUserOpenId) {
    return {
      url: '/http-api/futureShop/createOrder.do',
      type: 'POST',
      param: {
        phone,
        store_code,
        source,
        orders,
        repeatToken,
        marketingUserId, marketingUserPhone, marketingUserOpenId
      }
    }
  },
  /**
   * 获取运费金额
   * @param cityCode
   * @param areaCode
   * @param amount
   * @returns {{url: string, type: string, param: {cityCode: *, areaCode: *, amount: *}}}
   */
  getFreight(cityCode, areaCode, amount, preOrders, storeCode) {
    return {
      url: '/http-api/futureShop/getFreight.do',
      type: 'POST',
      param: {
        cityCode,
        areaCode,
        amount,
        preOrders,
        storeCode
      }
    }
  },

  /**
   * 根据经纬度获取最近的门店
   * @param longitude
   * @param latitude
   * @returns {{url: string, type: string, param: {longitude: *, latitude: *}}}
   */
  getNearestShop(longitude, latitude, ) {
    return {
      url: '/shop/getNearestShop',
      type: 'GET',
      param: {
        longitude,
        latitude
      }
    }
  },
  /****
   * 获取省份列表
   */
  getProvinces() {
    return {
      url: '/district/provinces',
      type: 'GET',
    }
  },

  /****
   * 获取市列表
   */
  getCities(provinceId) {
    return {
      url: '/district/citys',
      type: 'GET',
      param: {
        provinceId: provinceId
      }
    }
  },
  /****
   * 获取区
   */
  getDistricts(cityId) {
    return {
      url: '/district/districts',
      type: 'GET',
      param: {
        cityId: cityId
      }
    }
  },
  /**
   * 扫码购物
   */
  getProductByScanning(barcode, shopCode) {
    return {
      url: '/item/getItemIdByBarcode',
      type: 'GET',
      param: {
        barcode: barcode,
        shopCode: shopCode
      }
    }
  },
  /****
   * 获取订单列表
   * 待付款： 1
   * 待发货：2
   * 待收货：4
   * 已收货：5
   */
  getOrderList(phone, curPage, pageSize, state) {
    return {
      // url: '/http-api/futureShop/orderListQuery.do',
      url: '/channelOrder/orderList.do',
      type: 'GET',
      param: {
        customerMobile: phone,
        curPage: curPage,
        pageSize: pageSize,
        channelOrderStatus: state
      }
    }
  },

  /****
   * 获取订单详情
   */
  getOrderDetail(orderCode) {
    return {
      // url: '/http-api/futureShop/getOrderDetail.do',
      url: '/channelOrder/orderDetail.do',
      type: 'GET',
      param: {
        // channelNo: channelNo,
        // soNo: soNo
        orderCode
      }
    }
  },

  /****
   * 获取新的订单数统计
   */
  getOrderStatusStatistics(customerMobile) {
    return {
      // url: '/http-api/futureShop/getOrderDetail.do',
      url: '/channelOrder/orderStatusStatistics',
      type: 'GET',
      param: {
        customerMobile
      }
    }
  },

  /****
   * 获取订单预约时间
   */
  updateOrder(param) {
    return {
      url: '/channelOrder/updateOrder',
      type: 'POST',
      param: param
    }
  },
  /****
   * 订单中心，支付
   */
  payOrderByAlipay(channelOrderNo, openId, payType) {
    return {
      url: '/http-api/futureShop/waitPayment.do',
      type: 'post',
      param: {
        channelOrderNo: channelOrderNo,
        openId: openId,
        payType: payType
      }
    }
  },
  /****
   * 申请售后
   */
  applyService(channelOrderNo, memo) {
    return {
      url: '/http-api/futureShop/applyAfterSale.do',
      type: 'post',
      param: {
        channelOrderNo: channelOrderNo,
        memo: memo
      }
    }
  },
  /**
   * 确认收货
   */
  confirmReceipt(orderCode) {
    return {
      // url: '/http-api/futureShop/confirmReceipt.do',
      url: '/channelOrder/confirmReceipt.do',
      type: 'get',
      param: {
        // channelOrderNo: channelOrderNo,
        orderCode
      }
    }
  },
  /**
   * 删除订单
   */
  deleteOrder(orderCode) {
    return {
      url: '/channelOrder/deleteOrder.do',
      type: 'GET',
      param: {
        // channelOrderNo: channelOrderNo,
        orderCode
      }
    }
  },
  /**
     * 门店信息查询（新）
     */
  shopInfo(shopCode) {
    return {
      url: '/channelOrder/shopInfo',
      type: 'GET',
      param: {
        shopCode
      }
    }
  },
  /**
   * 取消订单
   */
  cancelOrder(orderCode) {
    return {
      url: '/channelOrder/cancelOrder',
      type: 'GET',
      param: {
        // channelOrderNo: channelOrderNo,
        orderCode
      }
    }
  },
  /**
   * 完工码查询
   */
  getFinishedCode(orderCode) {
    return {
      url: '/channelOrder/getFinishedCode',
      type: 'GET',
      param: {
        orderCode
      }
    }
  },
  /**
   * 售后列表
   * @param channelOrderNo
   * @returns {{url: string, type: string, param: {channelOrderNo: *}}}
   */
  refundList(channelOrderId) {
    return {
      // url: '/http-api/futureShop/refundList.do',
      url: '/refund/refundList.do',
      type: 'POST',
      param: {
        channelOrderId: channelOrderId,
      }
    }
  },
  /**
   * 退款金额预计算
   * @param channelOrderItemId
   * @param refundNum
   * @returns {{url: string, type: string, param: {channelOrderItemId: *, refundNum: *}}}
   */
  getRefundAmount(channelOrderItemId, refundNum, applyRefundType) {
    return {
      // url: '/http-api/futureShop/refund/getRefundAmount.do',
      url: '/refund/getRefundAmount.do',
      type: 'POST',
      param: {
        channelOrderItemId,
        applyRefundType: applyRefundType,
        applyRefundQuantity: refundNum
      }
    }
  },
  /**
   * 提交退款申请
   * @param channelOrderItemId
   * @param refundType
   * @param applyRefundAmount
   * @param refundReason
   * @param refundNum
   * @param refundNote
   * @param commodityStatus
   * @returns {{url: string, type: string, param: {channelOrderItemId: *, refundType: *, applyRefundAmount: *, refundReason: *, refundNum: *, refundNote: *, commodityStatus: *}}}
   */
  saveRefund(channelOrderItemId, refundType, applyRefundAmount, refundReason, refundNum, refundNote, commodityStatus, refundRequestId) {
    return {
      // url: '/http-api/futureShop/refund/saveRefund.do',
      url: '/refund/saveRefund.do',
      type: 'POST',
      param: {
        channelOrderItemId,
        applyRefundType: refundType,
        applyRefundAmount,
        applyRefundQuantity: refundNum,
        refundReason,
        refundNote,
        refundReasonType: 1,
        refundRequestId
      }
    }
  },
  /**
   * 退款详情
   * @param channelOrderItemId
   * @returns {{url: string, type: string, param: {channelOrderItemId: *}}}
   */
  refundDetail(channelOrderItemId) {
    return {
      // url: '/http-api/futureShop/refund/refundDetail.do',
      url: '/refund/getRefundDetail.do',
      type: 'POST',
      param: {
        channelOrderItemId,
      }
    }
  },
  // /**
  //  * 获取地址列表
  //  * @returns
  //  */
  // getAddressList(shopCode) {
  //   return {
  //     url: '/retail-member/address/getAddress',
  //     type: 'get',
  //     param: {
  //       shopCode: shopCode
  //     }
  //   }
  // },
  /**
   * 获取地址列表
   * @returns
   */
  getAddressList(shopCode, phone) {
    return {
      // url: '/cutomer/addess/list',
      url: '/cutomer/addess/getAddress',
      type: 'get',
      param: {
        shopCode: shopCode,
        phone
      }
    }
  },


  /**
   * 删除地址
   * @param id
   * @returns {{url: string, type: string, param: {phone: *}}}
   */
  deleteAddress(id) {
    return {
      // url: '/retail-member/address//deleteAddress',
      url: '/cutomer/addess/delete',
      type: 'GET',
      param: {
        id: id
      }
    }
  },

  /**
   * 新增地址
   * @param userName
   * @param address
   * @param phone
   * @param postCode
   * @param isDefaultAddress
   * @param serviceAreaList
   * @returns {{url: string, type: string, param: {userName: *, address: *, districtName: *, cityName, districtCode: *, phone: *, cityCode, provinceCode: *, postCode: *, isDefaultAddress: *, provinceName: *}}}
   */
  addAddress(userName, address, phone, postCode, isDefaultAddress, serviceAreaList) {
    return {
      url: '/retail-member/address/addAddress',
      type: 'post',
      param: {
        userName: userName,
        address: address,
        districtName: serviceAreaList[0].districtName,
        cityName: serviceAreaList[0].cityName,
        districtCode: serviceAreaList[0].districtCode,
        relationPhone: phone,
        cityCode: serviceAreaList[0].cityCode,
        provinceCode: serviceAreaList[0].proviceCode,
        postCode: postCode,
        isDefaultAddress: isDefaultAddress,
        provinceName: serviceAreaList[0].provinceName,
      }
    }
  },
  createAddress(addressInfo) {
    return {
      url: '/cutomer/addess/create',
      type: 'post',
      param: {
        data: addressInfo,
      }
    }
  },
  /**
   * 修改地址
   * @param userName
   * @param address
   * @param phone
   * @param postCode
   * @param isDefaultAddress
   * @param serviceAreaList
   * @returns {{url: string, type: string, param: {userName: *, address: *, districtName: *, cityName, districtCode: *, phone: *, cityCode, provinceCode: *, postCode: *, isDefaultAddress: *, provinceName: *}}}
   */
  changeAddress(id, userName, address, phone, postCode, isDefaultAddress, serviceAreaList) {
    return {
      url: '/retail-member/address/updateAddress',
      type: 'post',
      param: {
        id: id,
        userName: userName,
        address: address,
        districtName: serviceAreaList[0].districtName,
        cityName: serviceAreaList[0].cityName,
        districtCode: serviceAreaList[0].districtCode,
        relationPhone: phone,
        cityCode: serviceAreaList[0].cityCode,
        provinceCode: serviceAreaList[0].proviceCode,
        postCode: postCode,
        isDefaultAddress: isDefaultAddress,
        provinceName: serviceAreaList[0].provinceName,
      }
    }
  },
  updateAddress(addressInfo) {
    return {
      url: '/cutomer/addess/update',
      type: 'post',
      param: {
        data: addressInfo
      }
    }
  },
  /**
   * 首页banner图
   * @param location，微信商城("首页顶部广告位"-5, "首页第二广告位" -6 第一广告位是9 dc广告位8   爆款广告位7)
   * @param shopCode
   * @param terminalType，终端类型，微信商城-10
   * @returns 
   */
  getAdScreenList(location, shopCode, terminalType, bizType, curPage, pageSize) {
    return {
      url: '/cms-service/adScreen/list.do',
      type: 'GET',
      param: {
        location: location,
        shopCode: shopCode,
        terminalType: terminalType,
        bizType: bizType,
        curPage: curPage,
        pageSize: pageSize
      }
    }
  },
  /**
   * 首页爆款列表
   * @param shopCode
   * @param terminalType，终端类型，微信商城-10
   * @returns 
   */
  getHotProductList(shopCode, terminalType, bizType) {
    return {
      url: '/cms-service/hotProduct/list.do',
      type: 'GET',
      param: {
        shopCode: shopCode,
        terminalType: terminalType,
        bizType: bizType,
      }
    }
  },
  /**
   * 首页banner自定义详情
   * @param id
   * @returns 
   */
  getDetailAdScreen(id) {
    return {
      url: '/cms-service/adScreen/detail.do',
      type: 'GET',
      param: {
        id: id
      }
    }
  },
  /**
     * 查询物流列表
     * @param orderCode 订单号
     */
  logisticsList(orderCode) {
    return {
      url: '/logistics/logisticsList',
      type: 'get',
      param: {
        channelOrderCode: orderCode,
      }
    }
  },
  /**
   * 查询物流进度
   * @param  交货单号
   */
  logisticsDetail(id) {
    return {
      url: '/logistics/h5Log/' + id,
      type: 'get',
    }
  },
  /**
   * 首页集合接口
   * @param terminalType 10 小程序，
   */
  homepageCollection(shopId, shopCode, terminalType) {
    return {
      url: '/salesAdmin/homepage/collection',
      type: 'get',
      param: {
        shopId, shopCode, terminalType
      }
    }
  },
  /**
   * 活动分类
   */
  activityCatgery(shopCode, activityId) {
    return {
      url: '/activitycatgery',
      type: 'get',
      param: {
        shopCode, activityId
      }
    }
  },
  /**
   * 活动的商品
   */
  activityGoods(shopCode, catId, activityId, curPage, pageSize) {
    return {
      url: '/activitygoods',
      type: 'get',
      param: {
        shopCode, catId, activityId, curPage, pageSize
      }
    }
  },
  /****
   * 获取人人营销销售员身份校验
   */
  getValidateRole() {
    return {
      url: '/marketing-service/performance/validateRole.do',
      type: 'GET',
    }
  },
  /****
   * 获取人人营销业绩综述
   */
  getSummarize() {
    return {
      url: '/marketing-service/performance/getSummarize.do',
      type: 'GET',
    }
  },
  /****
   * 获取人人营销业绩列表
   */
  getRankingList(curPage, pageSize, areaScopeType, rankType) {
    return {
      url: '/marketing-service/performance/getRankingList.do',
      type: 'GET',
      param: {
        areaScopeType: areaScopeType,
        rankType: rankType,
        curPage: curPage,
        pageSize: pageSize
      }
    }
  },
  /****
   * 根据订单号查询线上订单商品详情
   */
  queryOnlineOrderList(orderNo) {
    return {
      url: '/invoice/print/queryOnlineOrderList.do',
      type: 'GET',
      param: {
        orderNo
      }
    }
  },
  /****
   * 新开电子发票
   */
  openerElectronicinvoice(info, orderInfoVOList, status = '1', itemType = '3', itemSource = '2', discountAmount = '0', key = 'wechat_shop') {
    return {
      url: '/invoice/print/openerElectronicinvoice.do',
      type: 'POST',
      param: {
        shopNo: info.shopNo,
        taxCode: info.taxCode,
        name: info.name,
        account: info.account,
        address: info.address,
        bank: info.bank,
        email: info.email,
        mobile: info.mobile,
        tel: info.tel,
        isHomeDecoration: info.isHomeDecoration,
        customerCardCode: info.customerCardCode,
        orderTime: info.orderTime,
        payWayName: info.payWayName,
        pointDeductionAmount: info.pointDeductionAmount,
        couponPayAmount: info.couponPayAmount,
        invoiceTotalAmt: info.invoiceTotalAmt,
        orderInfoVOList,
        status,
        itemType,
        itemSource,
        discountAmount,
        key
      }
    }
  },
  /****
   * 根据订单号查询所在交易单的发票信息
   */
  handleInvoiceByOrderNo(orderNo) {
    return {
      url: '/invoice/print/handleInvoiceByOrderNo.do',
      type: 'GET',
      param: {
        orderNo
      }
    }
  },
  /****
   * 根据流水号批量查询开票状态
   */
  invoicePrintResult(tradeNos) {
    return {
      url: '/invoice/print/invoicePrintResult.do',
      type: 'POST',
      param: {
        tradeNos
      }
    }
  },
  /**
   * 首页热词
   */
  homepageHotlist(shopCode, terminalType, pageSize) {
    return {
      url: '/homepage/hotlist',
      type: 'get',
      param: {
        shopCode, terminalType, pageSize
      }
    }
  },
  /**
   * 首页热词
   */
  homepageDefaultsech(shopCode, terminalType) {
    return {
      url: '/salesAdmin/homepage/defaultsech',
      type: 'get',
      param: {
        shopCode, terminalType
      }
    }
  },
  /*
   * 获取积分
   */
  queryByMobile(mobile) {
    return {
      url: '/customer/point/queryByMobile.do',
      type: 'GET',
      param: {
        mobile
      }
    }
  },
  /**
   * 获取爆品列表
   */
  detailHotPro(shopCode, terminalType, curPage, pageSize) {
    return {
      url: '/detailhotpro',
      type: 'get',
      param: {
        shopCode, terminalType, curPage, pageSize
      }
    }
  },
  /*
   * 根据商品信息获取优惠券
   */
  findCouponInfoByOrderProduct(mobile, shopCode, productInfoDtos, receiverAddressId) {
    return {
      url: '/ticketCoupon/findCouponInfoByOrderProduct.do',
      type: 'POST',
      param: {
        mobile,
        shopCode,
        productInfoDtos,
        receiverAddressId
      }
    }
  },
  /*
  * 根据商品信息获取最佳优惠券组合
  */
  findBestCouponInfoByOrderProduct(mobile, shopCode, productInfoDtos) {
    return {
      url: '/ticketCoupon/findBestCouponInfoByOrderProduct.do',
      type: 'POST',
      param: {
        mobile,
        shopCode,
        productInfoDtos
      }
    }
  },
  /**
    * 查看进度
    * */
  checkStage(channelOrderCode) {
    return {
      url: '/bnq_worker/custom-made/checkProgressForSmallRoutine.do',
      type: 'GET',
      param: {
        channelOrderCode: channelOrderCode
      }
    }
  },
  /**
   * 上传资料的记录
   */
  uploadRecord(channelOrderCode, curPage, pageSize) {
    return {
      url: '/bnq_worker/custom-made/queryMaterialForSmallRoutine.do',
      type: 'GET',
      param: {
        channelOrderCode: channelOrderCode,
        curPage: curPage,
        pageSize: pageSize
      }
    }
  },
  /**
   * 查看资料的客户认可和客户不认可接口
   */
  customerApproval(materialId, status) {
    return {
      url: '/bnq_worker/custom-made/customerApproval.do',
      type: 'GET',
      param: {
        materialId: materialId,
        status: status
      }
    }
  },
  /**
   * 获取1201活动券的活动
   */
  getActive(phone, token, channel) {
    return {
      url: '/wx-service/public/test/app/1201',
      type: 'POST',
      param: {
        phone: phone,
        token: token,
        channel: channel
      }
    }
  },
  /**
   * 获取1201活动券的活动
   */
  sendWx(wxUrl, clickId, user_action_set_id, action_time, value) {
    return {
      url: '/wx-service/public/test/app/1201/sendWx',
      type: 'POST',
      param: {
        wxUrl,
        clickId,
        user_action_set_id,
        action_time,
        value
      }
    }
  },
  /**
   * 获取运费图片
   */
  getCarriageImg(shopCode) {
    return {
      url: '/item/getCarriageImg',
      type: 'get',
      param: {
        shopCode: shopCode
      }
    }
  },
  /**
   * 获取证件类型
   */
  getPapersTypes() {
    return {
      url:'/energySubsidy/meta',
      type: 'get',
    }
  },
  /**
   * 获取用户节能补贴资料
   * @param customerPhone 用户手机号
   */
  getPapersInfo(customerPhone) {
    return {
      url:'/energySubsidy/info',
      type: 'get',
      param: {
        customerPhone: customerPhone
      }
    }
  },
  /**
   * 保存更新用户节能补贴资料
   * @param customerPhone 用户手机号
   * @param certificateType 证件类型
   * @param certificateNo 证件号码
   * @param customerName 姓名
   * @param idCardNo 身份证号码
   * @param payAccount 支付账号
   * @param householdType 户口类型
   * @param idCardBackendImg 身份证反面照
   * @param idCardFrontImg 身份证正面照
   * @param certificateBackendImg 证件反面照
   * @param certificateFrontImg 证件正面照
   * @param img1 客户基础信息页
   * @param img2 续签第一页
   * @param img3 续签第二页
   */
  getPapersUpdate(param) {
    return {
      url:'/energySubsidy/update',
      type: 'post',
      param: param
    }
  },
  /* 
   * 预买单-推送促销员预购单到购物车
   */
  pushCustomCart(phone,preOrderId,shopCode) {
    return {
      url:'/bnq_worker/advance/pay/pushCustomCart.do',
      type: 'get',
      param: {
        phone,
        preOrderId,
        shopCode
      }
    }
  },
  /* 
   * 根据shopCode获取shopInfo
   * @param shopCode
   */
  queryByShopCode(shopCode) {
    return {
      url:'/shop/queryByShopCode',
      type: 'get',
      param: {
        shopCode: shopCode
      }
    }
  },
};
module.exports = FurtureStoreUrl;
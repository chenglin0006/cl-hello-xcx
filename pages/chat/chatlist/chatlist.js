// pages/chat/chatlist/chatlist.js
const AV = require('../../../libs/leancloud-storage.js');
const { Realtime, TextMessage, Event } = require('../../../libs/leancloud-realtime.js');
const { TypedMessagesPlugin, ImageMessage } = require('../../../libs/leancloud-realtime-plugin-typed-messages.js');
const ChatUtil = require('../ChatUtil.js')
var baserequest = require("../../../utils/baserequest.js")
var ownerUrl = require('../../../configs/OwnerUrl.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // chatList:['姜小花','姜疙瘩'],
    chatList:[],
    clentData:{}
  },
  userClient:null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    ChatUtil.login().then((userClient) => {
      console.log('1111111')
      _this.userClient = userClient
      _this.userClient.on(Event.MESSAGE, _this.messageHandler);
      _this.userClient.on(Event.MEMBERS_JOINED, _this.messageHandler);
      _this.userClient.on(Event.MEMBERS_LEFT, _this.messageHandler);
      _this.userClient.on(Event.MEMBERS_BLOCKED, _this.messageHandler);
      _this.userClient.on(Event.MEMBERS_UNBLOCKED, _this.messageHandler);
      _this.userClient.on(Event.MEMBERS_MUTED, _this.messageHandler);
      _this.userClient.on(Event.MEMBERS_UNMUTED, _this.messageHandler);
      _this.userClient.on(Event.INVITED, _this.messageHandler);
      _this.userClient.on(Event.KICKED, _this.messageHandler);

      _this.userClient.on(Event.LAST_DELIVERED_AT_UPDATE, this.messageHandler);
      _this.userClient.on(Event.LAST_READ_AT_UPDATE, this.messageHandler);
      _this.userClient.on(Event.MESSAGE_RECALL, this.messageHandler);
      _this.userClient.on(Event.MESSAGE_UPDATE, this.messageHandler);
      _this.userClient.on(Event.INFO_UPDATED, this.messageHandler);
      _this.userClient.on(Event.UNREAD_MESSAGES_COUNT_UPDATE, this.messageHandler);
      console.log('2222222')

      console.log('3333333')
      _this.getAllData()
      console.log('4444444')
    })
    
  },
  messageHandler:function() {
    this.getAllData()
  },
  getAllData:function() {
    let _this = this
    console.log('555555')
    ChatUtil.getNormalConvs().then((data) => {
      let listData = data.map((e) => {
        let item = ChatUtil.getSingleConvTarget(e)
        return item
      })
      console.log('listData===', listData)
      this.getIconAndName(listData.map((item, i) => !!item.friendId ? item.friendId:''))
      _this.setData({
        chatList: listData
      })
    }).catch((err)=>{
      console.log('err===', err)
    })
  },
  selectFriend:function(e){
    let friend = e.currentTarget.dataset.friend;
    ChatUtil.createSingleConv(friend)
    console.log('friend--', friend)
  },
  getIconAndName:function(ids){
    let _this = this
    let needIds = []
    for(let i=0;i<ids.length;i++){
      let clent_id = ids[i]
      if (!!clent_id && !_this.data.clentData[clent_id]){
        needIds.push(clent_id)
      }
    }
    if(needIds.length>0){
      baserequest.ztRequest(ownerUrl.getChatUser(needIds), (result) => {
        let clentData = _this.data.clentData
        for(let i =0;i<needIds.length;i++){
          let item = needIds[i]
          if (!!result[item]){
            clentData[item] = result[item]
          }else{
            clentData[item] = { "headPicUrl": '', "nickname": item }
          }
        }
        _this.setData({ clentData: clentData})
        

      }, (code) => {
      }, false, false)
    }
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    // this.getAllData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.userClient){
      this.userClient.off(Event.MESSAGE, this.messageHandler);
      this.userClient.off(Event.MEMBERS_JOINED, this.messageHandler);
      this.userClient.off(Event.MEMBERS_LEFT, this.messageHandler);
      this.userClient.off(Event.MEMBERS_BLOCKED, this.messageHandler);
      this.userClient.off(Event.MEMBERS_UNBLOCKED, this.messageHandler);
      this.userClient.off(Event.MEMBERS_MUTED, this.messageHandler);
      this.userClient.off(Event.MEMBERS_UNMUTED, this.messageHandler);
      this.userClient.off(Event.INVITED, this.messageHandler);
      this.userClient.off(Event.KICKED, this.messageHandler);

      this.userClient.off(Event.LAST_DELIVERED_AT_UPDATE, this.messageHandler);
      this.userClient.off(Event.LAST_READ_AT_UPDATE, this.messageHandler);
      this.userClient.off(Event.MESSAGE_RECALL, this.messageHandler);
      this.userClient.off(Event.MESSAGE_UPDATE, this.messageHandler);
      this.userClient.off(Event.INFO_UPDATED, this.messageHandler);
      this.userClient.off(Event.UNREAD_MESSAGES_COUNT_UPDATE, this.messageHandler);
    }
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
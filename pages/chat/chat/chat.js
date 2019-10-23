// pages/chat/chat.js
const ChatUtil = require('../ChatUtil.js')
const AV = require('../../../libs/leancloud-storage.js');
const DateUtil = require('../../../utils/DateUtil.js')
const { TypedMessagesPlugin, ImageMessage } = require('../../../libs/leancloud-realtime-plugin-typed-messages.js');
const { Realtime, TextMessage, Event } = require('../../../libs/leancloud-realtime.js');
import GoodsMessage from '../newtypemessage/GoodsMessage'
var baserequest = require("../../../utils/baserequest.js")
var ownerUrl = require('../../../configs/OwnerUrl.js')
const app = getApp();
export const smileys = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '🤖', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowEmoj:false,
    smileys: smileys,
    scrollTop:0,
    inputValue:'',
    inputFocus:false,
    lastReadAt:0,
    messages:[],
    clentData:{}
  },
  messageData:[],
  hasLoadAllMessages:false,
  messageIterator:[],
  // typingIndicator:null,
  conversation:null,
  clientId:'',
  good:null,
  self_clientId:'',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this 
    let clientId = options.clientId
    let convId = options.convId
    let good = options.good
    if(!!good){
      this.good = JSON.parse(decodeURIComponent(good))
    }
    _this.clientId = clientId
    _this.self_clientId = ChatUtil.getClientId()
    console.log('clientId=====', clientId)
    ChatUtil.login().then(()=>{
      ChatUtil.createSingleConv(clientId, convId).then((conversation) => {
        _this.conversation = conversation
        _this.messageIterator = conversation.createMessagesIterator({ limit: 20 });
        console.log('conversation==', conversation.lastReadAt)
        // _this.typingIndicator = app.LeanRT.typingIndicator

        // _this.typingIndicator.setConversation(conversation);
        // _this.typingIndicator.on('change', () => {
        //   if (_this.typingIndicator.typingClients.length) {
        //     _this.typingClients = `${_this.typingIndicator.typingClients.join(', ')} 正在输入`;
        //   } else {
        //     _this.typingClients = null;
        //   }
        //   console.log('_this.typingIndicator   ', _this.typingClients)
        // });


        // _this.conversation.on(Event.MESSAGE, _this.readMarker);
        _this.conversation.on(Event.MESSAGE, _this.messageUpdater);
        _this.conversation.on(Event.LAST_DELIVERED_AT_UPDATE, _this.receiptUpdateHandler);
        _this.conversation.on(Event.LAST_READ_AT_UPDATE, _this.receiptUpdateHandler);
        _this.conversation.on('lastreadtimestampsupdate', _this.receiptUpdateHandler);
        _this.conversation.on(Event.MESSAGE_RECALL, _this.replaceRecalledMessage);
        // document.addEventListener("visibilitychange", handleVisibilityChange);
        _this.loadMoreMessages(true)
        if (_this.good) {
          this.sendGoods(_this.good['itemSkuId'], _this.good['itemId'], _this.good['price'], _this.good['title'], _this.good['subTitle'], _this.good['imageUrl'])
        }

      }).catch((err) => {
        console.log('err', err)
      })
    }).catch(()=>{

    })
    
  },
  setMessages:function(msg){
    let _this = this
    _this.getIconAndName(msg.map(item => item['from']))
    _this.messageData = msg.concat(_this.messageData)
    let previousMessageTime = null
    
    _this.setData({
      lastReadAt: _this.conversation.lastReadAt ? Date.parse(new Date(this.conversation.lastReadAt))  : 0,
      messages: _this.messageData.map((item)=>{
        let type = !!item.type ? item.type : item.content['_lctype']
        let thisTime = _this.getMessageTime(previousMessageTime, item['timestamp'])
        previousMessageTime = item['timestamp']
        if(type==-2){
          console.log('imageUrl==', item.getFile())
          console.log('thumbnailURL==', item.getFile().thumbnailURL(260, 360))
        }
        
        return {
          from: item['from'],
          time: thisTime,
          content: item['text'],
          isSelf: item['from'] == _this.self_clientId+'',
          type: type,
          imageUrl: type == -2 ? item.getFile().url() : '',
          thumbnailURL: type == -2 ? item.getFile().thumbnailURL(260, 360) : "",
          goodsImageUrl: type == 1 ? item['imageUrl'] : '',
          goodsTitle: type == 1 ? item['title'] : '',
          goodsSubTitle: type == 1 ? item['subTitle'] : '',
          timestamp: Date.parse(new Date(item['timestamp'])),
        }
      })
    })
  },
  addMessage:function(msg){
    console.log(msg)
    let _this = this
    _this.messageData.push(msg)
    let previousMessageTime = null
    
    _this.setData({
      lastReadAt: _this.conversation.lastReadAt ? Date.parse(new Date(this.conversation.lastReadAt)) : 0,
      messages: _this.messageData.map((item) => {
        let type = !!item.type ? item.type : item.content['_lctype']
        let thisTime = _this.getMessageTime(previousMessageTime, item['timestamp'])
        previousMessageTime = item['timestamp']
        return {
          from: item['from'],
          time: thisTime,
          content: item['text'],
          isSelf: item['from'] == _this.self_clientId+'',
          type: type,
          imageUrl: type == -2 ? item.getFile().url():'',
          thumbnailURL: type == -2 ?item.getFile().thumbnailURL(260, 360) :"",
          goodsImageUrl: type == 1 ? item['imageUrl']:'',
          goodsTitle: type == 1 ? item['title'] : '',
          goodsSubTitle: type == 1 ? item['subTitle'] : '',
          timestamp: Date.parse(new Date(item['timestamp'])),
        }
      })
    })
  },
  getMessageTime: function (previousMessageTime, currentMessageTime){
    
    if (!previousMessageTime) {
      return DateUtil.getDateStr(Date.parse(new Date(currentMessageTime)))
    } else if (!!previousMessageTime) {
      const thisMinute = Math.floor(currentMessageTime / 60000);
      const previousMinute = Math.floor(previousMessageTime / 60000);
      if (thisMinute !== previousMinute) {
        return DateUtil.getDateStr(Date.parse(new Date(currentMessageTime)))
      }
    }
    return ""
  },
  getCurrentConversation: function (clientId){

  },
  readMarker:function(message){
    console.log('readMarker=======', message)
    // 暂态消息不标记
    // 特殊情况：暂态对话的所有消息都是暂态的，因此暂态对话收到消息全部标记
    if (msg.transient && !this.conversation.transient) {
      return;
    }
    // 当前 tab 未激活不标记
    if (document.hidden) {
      return;
    }
    // 当前对话标记为已读
    this.conversation.read().then(function (conversation) {
      console.log('read')
    }).catch((err) => {
      console.log('read err', err)
    });
  },
  messageUpdater: function (msg){
    console.log('messageUpdater=======', msg)
    // 如果收到未知类型的暂态消息，直接丢弃
    if (msg.transient && msg.type === Message.TYPE) {
      return;
    }
    // 消息列表滚动
    this.addMessage(msg);
    this.scrollToBottom();
    this.conversation.read().then(function (conversation) {
      console.log('read')
    }).catch((err) => {
      console.log('read err', err)
    });
  },

  receiptUpdateHandler:function(){
    console.log('receiptUpdateHandler', this.conversation.lastReadAt)
    this.setData({
      lastReadAt: Date.parse(new Date(this.conversation.lastReadAt))
    })
  },

  handleVisibilityChange: function () {
    if (this.conversation.unreadMessagesCount) {
      this.conversation.read().then(function (conversation) {
        console.log('read')
      }).catch((err)=>{
        console.log('read err', err)
      });
    }
  },

  scrollToBottom:function(){
    this.setData({
      // isShowEmoj: true,
      scrollTop: 1000000
    })
  },
  bindfocus:function(event){
    console.log('bindfocus', event)
    this.scrollToBottom()
  },
  onClickEmoj: function (e) {
    let item = e.currentTarget.dataset.item;
    this.setData({
      inputValue: this.data.inputValue+item,
    })
    console.log('onClickEmoj', item)
  },
  bindscrolltoupper:function(){
    // console.log('bindscrolltoupper')
    this.loadMoreMessages(false)
  },
  bindscrolltolower: function () {
    console.log('bindscrolltolower')
  },
  replaceRecalledMessage: function (recalledMessage){
    // this.messages = this.messages.map(message => (message.id === recalledMessage.id ? recalledMessage : message));
    // $scope.$digest();
  },
  bindscroll:function(){
    console.log('bindscroll')
    // if(this.data.isShowEmoj){
    //   this.setData({
    //     isShowEmoj: false
    //   })
    // }
  },
  getImage(){
    let _this = this
    _this.setData({
      isShowEmoj: false
    })
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log('ddddd',tempFilePaths)
        _this.sendImage(tempFilePaths)
      }
    })
  },
  getExpression() {
    this.setData({
      isShowEmoj:true,
      // inputFocus:true,
      // scrollTop: 1000000
    })
    
  },
  textChange(event){
    let { value, cursor, keyCode }=event.detail;
    console.log('textChange')
    this.setData({
      inputValue: value
    })
  },
  sendMessage(){
    this.sendText(this.data.inputValue)
    this.setData({
      isShowEmoj: false,
      inputValue:''
    })
  },
  getIconAndName: function (ids) {
    let _this = this
    let needIds = []
    let idSet = {}
    for (let i = 0; i < ids.length; i++) {
      let clent_id = ids[i]
      if (!!clent_id && !_this.data.clentData[clent_id] && !idSet[clent_id]) {
        needIds.push(clent_id)
        idSet[clent_id]='set'
      }
    }
    if (needIds.length > 0) {
      baserequest.ztRequest(ownerUrl.getChatUser(needIds), (result) => {
        let clentData = _this.data.clentData
        for (let i = 0; i < needIds.length; i++) {
          let item = needIds[i]
          if (!!result[item]) {
            clentData[item] = result[item]
          } else {
            clentData[item] = { "headPicUrl": '', "nickname": item }
          }
        }
        _this.setData({ clentData: clentData })


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
    if (this.conversation){
      // this.conversation.off(Event.MESSAGE, this.readMarker);      
      this.conversation.off(Event.MESSAGE, this.messageUpdater);
      this.conversation.off(Event.LAST_DELIVERED_AT_UPDATE, this.receiptUpdateHandler);
      this.conversation.off(Event.LAST_READ_AT_UPDATE, this.receiptUpdateHandler);
      this.conversation.off('lastreadtimestampsupdate', this.receiptUpdateHandler);
      this.conversation.off(Event.MESSAGE_RECALL, this.replaceRecalledMessage);
      // this.typingIndicator.off('change');
      // document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  },
  clickImage:function(data){
    let _this = this
    let images = _this.messageData.filter((item) => item.type==-2).map((item)=>item.getFile().url())
    wx.previewImage({
      current: data.detail, // 当前显示图片的http链接
      urls: images // 需要预览的图片http链接列表
    })
    console.log('url======',url)
  },
  clickGoods:function(data){
    let index = data.detail
    let goodsMessage = this.messageData[index]
    let itemId = goodsMessage['itemId']
    wx.navigateTo({
      url: '/pages/goods/detail/detail?itemId=' + itemId
    })
    console.log(goodsMessage)
  },
  send: function (message){
    console.log(message);
    // this.typingIndicator.updateStatus(0);
    let _this = this
    _this.conversation.send(message, {
      receipt : true
    }).then(() => {
      
    }).catch(err => {
      console.error(err);
    });
    console.log('send=====', message)
    _this.addMessage(message);
    _this.scrollToBottom()
  },
  sendText: function (draft){
    if (!draft) {
      return;
    }
    const message = new TextMessage(draft);
    return this.send(message);
    // 
    
    
  },
  sendGoods: function (itemSkuId, itemId, price, title, subTitle, imageUrl){
    const goodsMessage = new GoodsMessage(itemSkuId, itemId, price, title, subTitle, imageUrl);
    return this.send(goodsMessage)
  },

  sendImage: function (files){
    // const files = [...event.target.files];
    // event.target.form.reset(); // 否则无法连续发送相同的图片
    
    return Promise.all(files.map(file =>{
      console.log('file======', file)
      return new AV.File('图片.jpg', {
        blob: {
          uri: file,
        },
      } ).save().then(savedFile => this.send(new ImageMessage(savedFile)))
    
    }
      )).catch(console.error);
  },
  loadMoreMessages:function(isFirst){
    if (isFirst){
      this.conversation.read().then(function (conversation) {
        console.log('read')
      }).catch((err) => {
        console.log('read err', err)
      });
      console.log('this.conversation===')
    }
    if (this.hasLoadAllMessages) {
      return;
    }
    return this.messageIterator.next().then(result => {
      if (result.done) {
        this.hasLoadAllMessages = true;
      }
      console.log(result)
      this.setMessages(result.value)
      if(isFirst){
        this.scrollToBottom()
      }
      // $scope.messages = result.value.concat($scope.messages);
      
    });
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
const AV = require('../../libs/leancloud-storage.js');
const { Realtime, TextMessage, Event } = require('../../libs/leancloud-realtime.js');
const { TypedMessagesPlugin, ImageMessage } = require('../../libs/leancloud-realtime-plugin-typed-messages.js');
const regeneratorRuntime = require('../../libs/regenerator-runtime/runtime-module.js')
const DateUtil = require('../../utils/DateUtil.js')
var usercache = require('../../utils/usercache.js')
import GoodsMessage from './newtypemessage/GoodsMessage'
const app = {};
const init = async (appId, appKey)=>{
  // 初始化存储 SDK
  try {
    AV.init({
      appId: appId,
      appKey: appKey,
    });
    const realtime = new Realtime({
      appId: appId,
      appKey: appKey,
      // pushOfflineMessages: true,
      // server: 'rtm51',
      plugins: [TypedMessagesPlugin],
      region: 'cn' // 美国节点为 "us"
    });
    realtime.register([GoodsMessage]);
    app.LeanRT={}
    app.LeanRT.realtime = realtime;
    return realtime;

  } catch (err) {
    throw err
  }
}
const login = async ()=>{
  
  let userId = usercache.getUserId()
  if(!!userId){
    return loginWithClientId(userId+'')
  }
}
const loginWithClientId = async (clientId)=>{
  console.log('======', app.LeanRT)
  if (app&&app.LeanRT && app.LeanRT.imClient) {
    let userClient = app.LeanRT.imClient
    return userClient
  } else {
    app.LeanRT.imClient = null;
    app.LeanRT.currentConversation = null;
    let userClient = await app.LeanRT.realtime.createIMClient(clientId)
    app.LeanRT.imClient = userClient;
    return userClient
  }
}
const logout =async function(){
  if (app.LeanRT && app.LeanRT.imClient){
    try{
      app.LeanRT.imClient.close().then(()=>{
        console.log('leancloud 退出登录')
        app.LeanRT.imClient = null
      }).catch((err)=>{
        app.LeanRT.imClient = null
      })
      
    }catch(err){}
  }
}
const getNormalConvs= function() {
  return app.LeanRT.imClient.getQuery().withLastMessagesRefreshed(true).containsMembers([app.LeanRT.imClient.id]).find();
}
/**
   * 创建一个会话
   */
const createSingleConv = async (clientId, convId)=>{
  let normalConvs = await getNormalConvs()
  const targetConv = normalConvs.find(conv =>{
    if (conv.id == convId) {
      return true
    }else{
      return (conv.members.length === 2 && getSingleConvTarget(conv)['friendId'] === clientId)
    }
    return false
  })
  
  if (!!targetConv){
    return targetConv
  }
  return app.LeanRT.imClient.createConversation({
    members: [clientId],
    name: `${clientId} 和 ${app.LeanRT.imClient.id} 的对话`,
    transient: false,
    unique: false
  })
}
const getClientId = () => { return app.LeanRT.imClient.id}
const getSingleConvTarget = (conversation)=>{
  let members = conversation.members
  let friendId = members[0]
  if (members[0] === app.LeanRT.imClient.id) {
    friendId = members[1];
  }
  let lastMessage = conversation.lastMessage
  return {
    convId: conversation.id,
    friendId: friendId,
    friendName:'',
    friendIcon:'',
    lastMessage: lastMessage,
    lastMessageType: lastMessage?lastMessage.type:-1,
    lastMessageMessage: lastMessage? (lastMessage.type == -1 ? lastMessage['text'] : (lastMessage.type == -2 ? '[图片]' : (lastMessage.type==1?'商品信息':'未知消息类型'))):'',
    unreadMessagesCount: conversation.unreadMessagesCount,
    updatedAt: DateUtil.getDateStr(Date.parse(new Date(conversation.updatedAt)))
  }
}
// const getConversation = ()=>{
//   return app.LeanRT.imClient.getConversation()
// }
module.exports = {
  init: init,
  login: login,
  logout: logout,
  getNormalConvs: getNormalConvs,
  createSingleConv: createSingleConv,
  getSingleConvTarget: getSingleConvTarget,
  getClientId
}
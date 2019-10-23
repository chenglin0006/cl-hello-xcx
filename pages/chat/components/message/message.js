// pages/chat/components/message/message.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: Number,
    icon:String,
    isself: Boolean,
    name:String,
    content:String,
    time: String,
    timestamp:Number,
    lastReadAt:Number,
    type:Number,
    imageUrl:String,
    thumbnailURL:String,
    goodsImageUrl:String,
    goodsTitle: String,
    goodsSubTitle: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickImage:function(e){
      this.triggerEvent('clickImage', this.data.imageUrl)
      // let url = this.data.imageUrl
      // wx.previewImage({
      //   current: url, // 当前显示图片的http链接
      //   urls: [url] // 需要预览的图片http链接列表
      // })
      // console.log('imageUrl===', this.data.imageUrl)
    },
    clickGoods: function (e) {
      this.triggerEvent('clickGoods', this.data.index)
      // let url = this.data.imageUrl
      // wx.previewImage({
      //   current: url, // 当前显示图片的http链接
      //   urls: [url] // 需要预览的图片http链接列表
      // })
      // console.log('imageUrl===', this.data.imageUrl)
    },

  }
})

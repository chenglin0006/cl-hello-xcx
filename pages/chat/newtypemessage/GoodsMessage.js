import { TypedMessage, messageField, messageType } from '../../../libs/leancloud-realtime.js';

export default class GoodsMessage extends TypedMessage {
  constructor(itemSkuId, itemId, price, title, subTitle, imageUrl) {
    super();
    this.itemSkuId = itemSkuId;
    this.itemId = itemId;
    this.price = price;
    this.title = title;
    this.subTitle = subTitle;
    this.imageUrl = imageUrl;
    this.content = title
  }
}
messageField(['itemSkuId', 'itemId', 'price', 'title', 'subTitle', 'imageUrl'])(GoodsMessage);
messageType(1)(GoodsMessage);

// pages/goods/cell/selectionTab/selectionTab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabDatas: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    
    showTags: [],
    currentTabIndex:-1,
    categoryLeftIndex:0,
    tagSelectedIndex:-1,
    rowSelectedIndex:-1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindLeftCategory(e){
      this.setData({
        categoryLeftIndex: e.currentTarget.dataset.index
      })
    },
    bindTabTitle(e){
      console.log('bindTabTitle',e)
      let item = e.currentTarget.dataset.item;
      this.setData({
        showTags: item.tags,
        currentTabIndex: e.currentTarget.dataset.index,
        isShowTabSelect: item.type == 'noItem'? false : !this.data.isShowTabSelect
      })
      if (item.type == 'noItem'){
        var tabData = {
          type: item.type,
          selectedTabIndex: this.data.currentTabIndex,
        } // detail对象，提供给事件监听函数
        var myEventOption = {} // 触发事件的选项
        this.triggerEvent('selectedTag', tabData, myEventOption)
      }
    },
    bindSelectTag(e) {

      console.log('bindSelectTag', e)
      let index = e.currentTarget.dataset.index
      if (this.data.tabDatas[this.data.currentTabIndex].type == 'tag'){
        this.setData({
          tagSelectedIndex: index
        })
      } else if (this.data.tabDatas[this.data.currentTabIndex].type == 'row') {
        this.setData({
          rowSelectedIndex: index
        })
      }
      this.setData({
        isShowTabSelect: false
      })
      let tag = this.data.tabDatas[this.data.currentTabIndex].type == 'category' ?
        this.data.tabDatas[this.data.currentTabIndex].tags[this.data.categoryLeftIndex].subCategory[index] : this.data.tabDatas[this.data.currentTabIndex].tags[index]
      var tabData = {
        type: this.data.tabDatas[this.data.currentTabIndex].type,
        selectedTabIndex: this.data.currentTabIndex,
        tag: tag
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('selectedTag', tabData, myEventOption)
    },
  },
  
})

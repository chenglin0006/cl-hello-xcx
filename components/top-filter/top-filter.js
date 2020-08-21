// component/top-filter/top-filter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 品牌
    brandList: {
      type: Array,
      value: [],
    },

    // 排序
    // sortList: {
    //   type: Array,
    //   value: [
    //     {
    //       sortName: '销量从高到低',
    //       sortCode: 1,
    //     }
    //   ],
    // },
  },

  /**
   * 组件的初始数据
   */
  data: {
    type: '',
    brandBarActive: false,
    sortBarActive: false,
    contentVisible: false,
    sortList: [
      {
        sortName: '综合排序',
        sortCode: 0,
      },
      {
        sortName: '销量从高到低',
        sortCode: 1,
      }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 品牌菜单栏切换
    handleToggleBrand() {
      let { brandList, type, brandBarActive, contentVisible } = this.data;
      contentVisible = contentVisible && type === 'brand' ? false : true;
      brandBarActive = contentVisible || brandList.some(item => item.selected);
      this.setData({ type: 'brand', brandBarActive, contentVisible });
    },

    // 筛选菜单栏切换
    handleToggleSort() {
      let { sortList, type, sortBarActive, contentVisible } = this.data;
      contentVisible = contentVisible && type === 'sort' ? false : true;
      sortBarActive = contentVisible || sortList.some(item => item.selected);
      this.setData({ type: 'sort', sortBarActive, contentVisible });
    },

    // 选择品牌
    handleSelectBrand(e) {
      const currentItem = e.currentTarget.dataset.item;
      currentItem.selected = !currentItem.selected;
      const brandList = this.data.brandList;
      const brandIndex = brandList.findIndex(item => item.id === currentItem.id);
      if (brandIndex > -1) {
        brandList.splice(brandIndex, 1, currentItem);
        this.setData({ brandList });
      }
    },

    // 选择筛选
    handleSelectSort(e) {
      const currentItem = e.currentTarget.dataset.item;
      currentItem.selected = !currentItem.selected;
      const sortList = this.data.sortList.map(item => {
        item.selected = false;
        return item;
      });
      const sortIndex = sortList.findIndex(item => item.sortCode === currentItem.sortCode);
      if (sortIndex > -1) {
        sortList.splice(sortIndex, 1, currentItem);
        this.setData({ sortList });
        this.triggerEvent('sort', currentItem);
        this.handleToggleSort();
      }
    },

    // 关闭弹框
    handleClose() {
      this.setData({ type: '', contentVisible: false });
      this.handleReset();
    },

    // 重置
    handleReset() {
      const brandList = this.data.brandList;
      brandList.forEach(item => {
        item.selected = false;
      });
      this.setData({ brandList });
    },

    // 确认
    handleConfirm() {
      const selectedList = this.data.brandList.filter(item => item.selected);
      this.triggerEvent('brands', selectedList);
      this.handleToggleBrand();
    },
  }
})

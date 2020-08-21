// components/base-modal/base-modal.js
Component({
  /**
   * 组件的选项列表
   */
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    // 弹框显示隐藏
    visible: Boolean,

    // 标题，如自定义标题参考 show-title
    title: String,

    // 取消按钮文字
    cancelText: {
      type: String,
      value: '取消'
    },

    // 确认按钮文字
    confirmText: {
      type: String,
      value: '确认'
    },

    // 自定义标题 show-title 设置为 false，并传入 slot="title" 的DOM节点
    showTitle: {
      type: Boolean,
      value: true,
    },

    // 显示右上角 Icon
    showCloseIcon: {
      type: Boolean,
      value: true,
    },

    // 显示取消按钮
    showCancelBtn: {
      type: Boolean,
      value: true,
    },

    // 显示确认按钮
    showConfirmBtn: {
      type: Boolean,
      value: true,
    },

    // 自定义标题 show-footer 设置为 false，并传入 slot="footer" 的DOM节点
    showFooter: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 防止弹框穿透滑动
    catchCatchMove() {
      return;
    },

    // 弹框取消事件
    handleCancel() {
      this.triggerEvent('cancel');
    },

    // 弹框确认事件
    handleConfirm() {
      this.triggerEvent('confirm');
    },
  }
})

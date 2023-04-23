// bottom-tab-bar.js
Component({
  properties: {},
  data: {},
  methods: {
    switchTab(event) {
      const index = event.currentTarget.dataset.index;
      this.triggerEvent('tabChange', { index });

      // 根据 index 跳转到相应页面
      switch (index) {
        case 0:
          wx.switchTab({ url: '/pages/home/home' });
          break;
        case 1:
          wx.switchTab({ url: '/pages/recommend/recommend' });
          break;
        case 2:
          wx.switchTab({ url: '/pages/my/my' });
          break;
      }
    },
  },
});

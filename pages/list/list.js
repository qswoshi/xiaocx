// list.js
const app = getApp();

Page({
  data: {
    listData: [],
    loading: true,
    error: false,
  },

  onLoad() {
    this.fetchListData();
  },

  onPullDownRefresh() {
    this.fetchListData();
  },

  async fetchListData() {
    this.setData({ loading: true, error: false });
    try {
      const res = await app.request('/api/list');
      if (res.code === 0) {
        this.setData({ listData: res.data });
      } else {
        this.setData({ error: true });
      }
    } catch (e) {
      this.setData({ error: true });
    } finally {
      this.setData({ loading: false });
      wx.stopPullDownRefresh();
    }
  },
});

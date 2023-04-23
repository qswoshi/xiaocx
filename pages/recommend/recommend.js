// 推荐页面脚本 recommend.js
Page({
  data: {
    recommendItems: [],
    loading: false,
    pageNum: 1,
    hasMore: true
  },

  onLoad() {
    this.fetchRecommendData();
  },

  onPullDownRefresh() {
    this.setData({ pageNum: 1 });
    this.fetchRecommendData(() => {
      wx.stopPullDownRefresh();
    });
  },

  fetchRecommendData(callback) {
    if (this.data.loading) return;

    this.setData({ loading: true });

    // 使用你的API请求方法
    api.fetchRecommendData(this.data.pageNum)
      .then(res => {
        const newList = this.data.pageNum === 1 ? res.data : this.data.recommendItems.concat(res.data);
        this.setData({
          recommendItems: newList,
          loading: false,
          pageNum: this.data.pageNum + 1,
          hasMore: res.hasMore
        });
      })
      .catch(err => {
        this.setData({ loading: false });
        wx.showToast({ title: '加载失败', icon: 'none' });
      })
      .finally(() => {
        if (callback) callback();
      });
  },

  loadMore() {
    if (!this.data.hasMore) return;
    this.fetchRecommendData();
  }
});

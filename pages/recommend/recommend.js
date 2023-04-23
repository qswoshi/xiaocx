// pages/recommend/recommend.js
import api from '../../utils/request.js';
import request from '../../utils/request';

Page({
  data: {
    recommendItems: [],
    loading: false,
    pageNum: 1,
    hasMore: true,
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

    request({
      url: api.fetchRecommendData(this.data.pageNum),
      success: (res) => {
        const newList = this.data.pageNum === 1 ? res.data : this.data.recommendItems.concat(res.data);
        this.setData({
          recommendItems: newList,
          loading: false,
          pageNum: this.data.pageNum + 1,
          hasMore: res.hasMore,
        });
      },
      fail: (err) => {
        this.setData({ loading: false });
        wx.showToast({ title: '加载失败', icon: 'none' });
      },
      complete: () => {
        if (callback) callback();
      },
    });
  },

  loadMore() {
    if (!this.data.hasMore) return;
    this.fetchRecommendData();
  },
});

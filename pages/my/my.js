// pages/my/my.js
import user from '../../utils/user.js';

Page({
  data: {
    userInfo: {},
  },

  onLoad: async function () {
    const userInfo = await user.getUserInfo();
    this.setData({ userInfo });
  },

  onPullDownRefresh: async function () {
    const userInfo = await user.getUserInfo();
    this.setData({ userInfo });
    wx.stopPullDownRefresh();
  },
});

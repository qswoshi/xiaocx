// pages/my/my.js
import api from '../../utils/request.js';
import request from '../../utils/request';

Page({
  data: {
    userInfo: {},
  },

  onLoad: function () {
    this.fetchUserInfo();
  },
  fetchUserInfo: function () {
    request({
      url: api.getUserInfo,
      success: (res) => {
        this.setData({ userInfo: res.data });
      },
    });
  },
  onShareAppMessage: function (event) {
    const title = this.data.userInfo.nickName + '的个人主页';
    return {
      title: title,
      path: '/pages/my/my',
    };
  },
});

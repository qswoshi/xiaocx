// utils/user.js
import request from './request.js';

async function getUserInfo() {
  // 如果缓存中已有用户信息，直接返回
  const userInfo = wx.getStorageSync('userInfo');
  if (userInfo) {
    return userInfo;
  }

  // 否则请求微信 API 获取用户信息
  const { userInfo: wxUserInfo } = await wx.getUserProfile({
    desc: '用于完善个人资料',
  });

  // 将用户信息存储到缓存
  wx.setStorageSync('userInfo', wxUserInfo);

  // 将用户信息上传至后端数据库
  await request({
    url: '/api/user/info',
    method: 'POST',
    data: wxUserInfo,
  });

  return wxUserInfo;
}

export default {
  getUserInfo,
};

export async function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const { code, data, message } = res.data;
          if (code === 0) {
            resolve(data);
          } else {
            reject(new Error(message || '请求失败'));
          }
        } else {
          reject(new Error('网络错误'));
        }
      },
      fail(err) {
        reject(err);
      },
    });
  });
}

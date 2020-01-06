//app.js
// const URL = "https://rsx.majiangyun.com";
App({
  onLaunch: function() {},
  globalData: {
    userInfo: {},
    URL: "https://rsx.majiangyun.com",
    gameId: -1,
    gameLevel: "primary",
    pockerNumber: -1
  },
  wxRequest(params) {
    let that = this;
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: "加载中" // 数据请求前loading
      });
      wx.request({
        url: that.globalData.URL + params.url, // 仅为示例，并非真实的接口地址
        data: params.data || {},
        method: params.method,
        header: {
          "content-type":
            params.method == "GET"
              ? "application/json"
              : "application/x-www-form-urlencoded",
          // 默认值
          token: params.token
        },
        success: function(res) {
          wx.hideLoading();
          resolve(res.data);
        },
        fail: function(res) {
          wx.hideLoading();
          // reject(false)
        },
        complete: function() {
          wx.hideLoading();
        }
      });
    });
  },
  getInGame(id, url) {}
});

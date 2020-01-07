const app = getApp();
Page({
  data: {
    userInfo: app.globalData.userInfo,
    domain: app.globalData.URL
  },
  onLoad: function() {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },
  toRank() {
    wx.navigateTo({
      url: "/pages/my/rank/index"
    });
  }
});

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
  onShareAppMessage: function(res) {
    let { id } = app.globalData.userInfo,
      path = "pages/firstPage/main?id=" + id;
    return {
      title: "11种脑力游戏，一起来玩吧！",
      path: path,
      success: function() {
        console.log("分享成功");
      },
      error: function() {
        console.log("分享失败");
      }
    };
  },
  to(e) {
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url
    });
  }
});

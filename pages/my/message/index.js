import regeneratorRuntime from "../../../utils/runtime.js";
const app = getApp();
Page({
  data: {
    list: []
  },
  onLoad: function() {
    this.getList();
  },
  async getList() {
    let { token } = app.globalData.userInfo;
    let result = await app.wxRequest({
      url: "/api/wxapp.user/myNews",
      token
    });
    this.setData({
      list: result.data
    });
  }
});

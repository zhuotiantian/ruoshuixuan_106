import regeneratorRuntime from "../../../utils/runtime.js";
const app = getApp();
Page({
  data: {
    domain: app.globalData.URL,
    rule: "",
    list: []
  },
  onLoad: function() {
    this.getList();
  },
  async getList() {
    let { token } = app.globalData.userInfo;
    let result = await app.wxRequest({
      url: "/api/wxapp.red_envelopes/redPackList",
      token
    });
    this.setData({
      rule: result.data.rule_description,
      list: result.data.list
    });
  },
  getMoney(e) {},
  showRedPocket(e) {},
  toGame(e) {}
});

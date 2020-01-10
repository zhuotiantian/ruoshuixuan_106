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
      list: result.data.list.filter(e => {
        return e.game_classification_id !== 0 && e.status !== "received";
      })
    });
  },
  getMoney(e) {},
  showRedPocket(e) {},
  // 进入游戏
  toGame(e) {
    let gameId = e.currentTarget.dataset.id;
    app.getInGame(gameId, "redPocket");
  }
});

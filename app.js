//app.js
// const URL = "https://rsx.majiangyun.com";
import regeneratorRuntime from "./utils/runtime.js";
App({
  onLaunch: function() {},
  globalData: {
    userInfo: {},
    URL: "https://rsx.majiangyun.com",
    gameId: -1,
    gameLevel: "primary",
    pockerNumber: -1,
    swiper_list: [],
    game_list: [],
    gameId: -1,
    gameInfo: [],
    memoryTime: 0,
    gameContent: {}
  },
  resetGameInfo() {
    this.globalData = Object.assign(this.globalData, {
      pockerNumber: -1,
      memoryTime: 0,
      gameLevel: "primary"
    });
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
          "content-type": params.method == "GET" ? "application/json" : "application/x-www-form-urlencoded",
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
  async getInGame(id, entry) {
    this.resetGameInfo();
    let { token } = this.globalData.userInfo;
    wx.showLoading({
      title: "加载中"
    });
    let result = await this.wxRequest({
      url: "/api/wxapp.game/getGame",
      data: {
        game_id: id
      },
      token
    });
    this.globalData.gameInfo = result.data.rules_of_the_game;
    this.globalData.gameId = id;
    wx.redirectTo({
      url: "/pages/games/index/index?isNew=" + JSON.stringify(entry === "firstPage")
    });
  }
});

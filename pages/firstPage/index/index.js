//index.js
//获取应用实例
import regeneratorRuntime from "../../../utils/runtime.js";
const app = getApp();
Page({
  data: {
    userId: null,
    swiper_list: [],
    game_list: [],
    domain: app.globalData.URL,
    showDetails: false,
    description: "",
    button: [{ text: "确认" }],
    showRegisterPocket: false,
    showSharePocket: false,
    registerPocketList: [],
    sharePocketList: []
  },
  onShareAppMessage: function(res) {
    return {
      path: "/pages/firstPage/index?id=" + this.userId,
      title: "11种脑力游戏，一起来玩吧！",
      success: function() {
        console.log("分享成功");
      },
      error: function() {
        console.log("分享失败");
      }
    };
  },
  onLoad: function() {
    let { game_list, swiper_list, userInfo } = app.globalData;

    if (!userInfo.token) {
      let that = this;
      wx.login({
        success: function(res) {
          that.login(res.code);
        }
      });
    } else {
      // this.getIndexData();
      this.setData({
        game_list: game_list,
        swiper_list: swiper_list
      });
      this.getRedPocketData();
    }
  },
  //获取用户信息
  async login(code) {
    let result = await app.wxRequest({
      url: "/api/wxapp.user/login",
      method: "POST",
      data: {
        code,
        type: "user"
      }
    });
    app.globalData.userInfo = result.data.userInfo;
    let { id, token } = result.data.userInfo;
    this.setData({
      userId: id
    });
    this.getIndexData();
    this.getRedPocketData();
  },
  //获取首页数据
  async getIndexData() {
    let result = await app.wxRequest({
      url: "/api/wxapp.index/index",
      method: "GET",
      token: this.token
    });
    let { game_list, rotary_planting_map } = result.data;
    let rules = [
      ["自由选择闪视时间和张数", "回忆并选出看到的扑克牌"],
      ["在最短时间内记忆52张扑克牌", "回忆并按顺序作答出所记扑克牌"],
      ["按顺序记忆并作答出所记扑克牌", "记忆牌副越多越好"],
      ["按顺序记忆并作答出所记数字", "记忆的数字越多越好"],
      ["按顺序记忆并作答出所记数字", "记忆速度越快越好"],
      ["按顺序记忆并作答出所记词语", "记忆的数字越多越好"],
      ["按顺序记忆并作答出所记词语", "记忆的词语越多越好"],
      ["记忆人名头像，越多越好", "作答时将人名和头像正确搭配"],
      ["记忆抽象图形，越多越好", "作答时将每行正确次序标注出来"],
      ["按照播放数字顺序记忆并作答所听数字", "记得越多越好"],
      ["记忆虚拟事件和日期，越多越好", "作答时将所记日期输入到所记历史事件前"]
    ];
    let answerTime = [0, 300, 7200, 1800, 900, 7200, 1800, 1800, 1800, 1800, 300, 900];
    game_list.forEach((e, index) => {
      e.rule = rules[index];
      e.answerTime = answerTime[index];
    });
    app.globalData.game_list = game_list;
    app.globalData.swiper_list = rotary_planting_map;
    this.setData({
      swiper_list: rotary_planting_map,
      game_list
    });
  },
  // 获取红包数据
  async getRedPocketData() {
    let result = await app.wxRequest({
      url: "/api/wxapp.red_envelopes/getRegisterToShareRedEnvelopes",
      method: "GET",
      token: this.token
    });
    let registerPocket = result.data.red_envelopes.filter(e => {
      return e.name == "注册";
    });
    let sharePocket = result.data.red_envelopes.filter(e => {
      return e.name !== "注册";
    });
    if (registerPocket.length > 0) {
      this.setData({
        showRegisterPocket: true
      });
    }
    if (sharePocket.length > 0) {
      this.setData({
        showSharePocket: true
      });
    }
    this.setData({
      registerPocketList: registerPocket,
      sharePocketList: sharePocket
    });
  },
  //显示轮播图详情
  showImageDetails(event) {
    let { description } = event.currentTarget.dataset;
    this.setData({
      showDetails: true,
      description
    });
  },
  // 关闭轮播图详情弹窗
  close(e) {
    this.setData({
      showDetails: false
    });
  },
  //关闭注册红包领取弹窗
  closeRegPocket() {
    this.setData({
      showRegisterPocket: false
    });
  },
  // 关闭分享红包领取弹窗
  closeSharePocket() {
    this.setData({
      showSharePocket: false
    });
  },
  // 跳转到排行榜页面
  toRank() {
    wx.navigateTo({
      url: "/pages/firstPage/rank/index"
    });
  },
  // 领取红包
  async getRedPocket() {
    let { token } = app.globalData.userInfo;
    let result = await app.wxRequest({
      url: "/api/wxapp.red_envelopes/getARedEnvelope",
      data: {
        red_envelopes_id: this.data.showRegisterPocket ? this.registerPocketList[0].id : this.sharePocketList[0].id,
        game_classification_id: 0
      },
      token
    });
    wx.showToast({
      title: "领取成功",
      icon: "success"
    });
    this.setData({
      showRegisterPocket: false,
      showSharePocket: false
    });
    wx.navigateTo({
      url: "/pages/my/hongbao/main"
    });
  },
  // 进入游戏
  toGame(e) {
    let { id, wxapp_url } = e.currentTarget.dataset.gameinfo;
    if (app.globalData.userInfo) {
      app.getInGame(id, wxapp_url);
    }
  }
});

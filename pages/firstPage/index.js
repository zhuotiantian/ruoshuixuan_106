//index.js
//获取应用实例
import regeneratorRuntime from "../../utils/runtime.js";
const app = getApp();
Page({
  data: {
    userId: null,
    swiper_list: [],
    game_list: [],
    domain: app.globalData.URL,
    showDetails: false,
    description: "",
    button: [{ text: "确认" }]
  },
  onLoad: function() {
    if (!app.globalData.userInfo.token) {
      let that = this;
      wx.login({
        success: function(res) {
          that.login(res.code);
        }
      });
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
    this.getRedPocket();
  },
  //获取首页数据
  async getIndexData() {
    let result = await app.wxRequest({
      url: "/api/wxapp.index/index",
      method: "GET",
      token: this.token
    });
    let { game_list, rotary_planting_map } = result.data;
    this.setData({
      swiper_list: rotary_planting_map
    });
  },
  // 获取红包数据
  async getRedPocket() {
    let result = await app.wxRequest({
      url: "/api/wxapp.red_envelopes/getRegisterToShareRedEnvelopes",
      method: "GET",
      token: this.token
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
  // 关闭弹窗
  close(e) {
    this.setData({
      showDetails: false
    });
  }
});

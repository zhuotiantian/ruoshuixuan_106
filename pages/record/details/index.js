import regeneratorRuntime from "../../../utils/runtime.js";
const app = getApp();
Page({
  data: {
    list: [],
    domain: app.globalData.URL
  },
  onLoad: function(option) {
    let id = option.id;
    this.getList(id);
  },
  async getList(id) {
    let { token } = app.globalData.userInfo;
    let result = await app.wxRequest({
      url: "/api/wxapp.student/myCardTask",
      data: {
        students_homework_details_id: id
      },
      token
    });
    this.setData({
      list: result.data
    });
  },
  toGame(e) {
    console.log(("打卡详情页面进入游戏", e.currentTarget.dataset.item));
  }
});

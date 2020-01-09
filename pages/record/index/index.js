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
      url: "/api/wxapp.user/taskListForCarding",
      token
    });
    result.data.forEach(e => {
      let init_time = new Date(e.createtime * 1000);
      let formateTime = init_time.getFullYear() + "-" + (Number(init_time.getMonth() + 1) < 10 ? "0" : "") + Number(init_time.getMonth() + 1) + "-" + (init_time.getDate() + 1 < 10 ? "0" : "") + init_time.getDate();
      e.createtime = formateTime;
    });
    this.setData({
      list: result.data
    });
  },
  toDetails(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/record/details/index?id=" + id
    });
  }
});

const app = getApp();
import regeneratorRuntime from "../../../utils/runtime.js";
Page({
  help() {
    wx.navigateTo({
      url: "/pages/games/help/index"
    });
  }
});

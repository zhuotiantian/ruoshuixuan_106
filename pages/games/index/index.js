const app = getApp();
import regeneratorRuntime from "../../../utils/runtime.js";
Page({
  data: {
    gameId: app.globalData.gameId,
    isPocker: true,
    page: 1,
    level: app.globalData.gameLevel,
    currentGameName: "",
    memoryTime: [],
    pockerNumber: [1, 2, 4, 8],
    activeTime: 2,
    activeNumber: 4
  },
  onLoad: function() {
    let { game_list, gameId } = app.globalData;
    let currentGameName = game_list.filter(e => {
      return e.id === gameId;
    })[0].name;
    this.setData({
      isPocker: /扑克/.test(currentGameName),
      currentGameName: currentGameName
    });
  },
  // 点击确认
  confirm: function() {
    this.setData({
      page: 2
    });
    let { gameInfo, gameLevel } = app.globalData;
    let currentGameIfo = gameInfo.filter(e => {
      return e.game_level === gameLevel;
    })[0];
    this.setData({
      memoryTime: currentGameIfo.memory_time.split(",").reverse()
    });
  },
  // 点击帮助
  help() {
    wx.navigateTo({
      url: "/pages/games/help/index"
    });
  },
  // 选择闪视时间
  selectTime(e) {
    let selectTime = e.currentTarget.dataset.activetime;
    this.setData({
      activeTime: Number(selectTime)
    });
  },
  // 选择显示张数
  selectNumber(e) {
    let selectNumber = e.currentTarget.dataset.activenumber;
    this.setData({
      activeNumber: Number(selectNumber)
    });
  },
  // 开始游戏
  start() {
    let { activeTime, activeNumber } = this.data;
    app.globalData.memoryTime = activeTime;
    app.globalData.pockerNumber = activeNumber;
  }
});

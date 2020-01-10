const app = getApp();
import regeneratorRuntime from "../../../utils/runtime.js";
Page({
  data: {
    gameId: app.globalData.gameId,
    page: 1,
    isPocker: false,
    level: app.globalData.gameLevel,
    currentGameName: "",
    memoryTime: [],
    pockerNumber: [1, 2, 4, 8],
    activeTime: 2,
    activeNumber: 4,
    memory_time: 0,
    rule: [],
    showRuleBox: true
  },
  onLoad: function(option) {
    let { game_list, gameId, gameInfo, gameLevel } = app.globalData;
    let { name, rule } = game_list.filter(e => {
      return e.id === gameId;
    })[0];
    let currentGameName = name;
    // 如果是闪视扑克牌，需要先计算闪视时间
    if (currentGameName === "闪视扑克牌") {
      let currentGameIfo = gameInfo.filter(e => {
        return e.game_level === gameLevel;
      })[0];
      this.setData({
        memoryTime: currentGameIfo.memory_time.split(",").reverse()
      });
    }
    this.setData({
      isPocker: /扑克/.test(currentGameName),
      currentGameName: currentGameName,
      rule: rule,
      showRuleBox: JSON.parse(option.isNew),
      gameId
    });
    wx.setNavigationBarTitle({
      title: currentGameName
    });
    this.getMemory_time();
  },
  returnTime: function(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    return (minutes !== 0 ? minutes + "分钟" : "") + (seconds !== 0 ? seconds + "秒" : "");
  },
  // 点击确认
  confirm: function() {
    this.setData({
      page: 2
    });
    this.getMemory_time();
  },
  // 获取记忆当前游戏等级的记忆时间
  getMemory_time() {
    let { gameInfo, gameLevel } = app.globalData;
    let memory_time = parseInt(
      gameInfo.filter(e => {
        return e.game_level === gameLevel;
      })[0].memory_time
    );
    let { activeNumber, currentGameName } = this.data;
    if (currentGameName !== "闪视扑克牌") {
      app.globalData.pockerNumber = activeNumber;
      app.globalData.memoryTime = memory_time;
      let that = this;
      this.setData({
        memory_time: that.returnTime(memory_time)
      });
    }
  },
  // 点击帮助
  help() {
    wx.navigateTo({
      url: "/pages/games/help/index"
    });
  },
  // 选择游戏等级
  selectLevel(e) {
    let level = e.currentTarget.dataset.level;
    app.globalData.gameLevel = level;
    this.setData({
      level
    });
    this.getMemory_time();
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
    let { activeTime, activeNumber, currentGameName, gameId } = this.data;
    if (currentGameName === "闪视扑克牌") {
      app.globalData.memoryTime = activeTime;
      app.globalData.pockerNumber = activeNumber;
    }
    this.getGameContent();
  },
  // 获取游戏内容
  async getGameContent() {
    let { gameId, level } = this.data;
    let { token } = app.globalData.userInfo;
    let result = await app.wxRequest({
      url: "/api/wxapp.game/getGameContent",
      data: {
        game_id: gameId,
        game_level: level
      },
      token
    });
    app.globalData.gameContent = result.data;
    let { game_list } = app.globalData;
    let currentGame = game_list.filter(e => {
      return e.id === gameId;
    });
    let pathname = currentGame[0].pathname;
    wx.redirectTo({
      url: "/pages/games/" + pathname + "/memory/index"
    });
  },
  // 关闭游戏规则弹窗
  close() {
    this.setData({
      showRuleBox: false
    });
  }
});

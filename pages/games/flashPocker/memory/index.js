import regeneratorRuntime from "../../../../utils/runtime.js";
const app = getApp();
Page({
  data: {
    bgCounts: new Array(23),
    showPocker: [],
    pockerNumber: 0,
    gameContent: {},
    showInterval: true,
    number: 3,
    showFinishMemoryBtn: false
  },
  onUnload: function() {
    clearInterval(this.memoryInterval);
  },
  onLoad() {
    this.setData({
      gameContent: app.globalData.gameContent,
      pockerNumber: app.globalData.pockerNumber
    });
    let timer = setInterval(() => {
      let number = this.data.number;
      if (number === 1) {
        clearInterval(timer);
        this.setData({
          showInterval: false
        });
        this.group();
      } else {
        number--;
        this.setData({
          number: number
        });
      }
    }, 1000);
  },
  group() {
    let { pockerNumber, gameContent } = this.data;
    let { list } = gameContent;
    this.setData({
      showPocker: list.slice(0, pockerNumber),
      showFinishMemoryBtn: true
    });
    this.startInterval();
  },
  // 开始记忆时间的倒计时
  startInterval() {
    let { memoryTime } = app.globalData;
    this.memoryInterval = setInterval(() => {
      this.finishMemory();
    }, memoryTime * 1000);
  },
  finishMemory() {
    clearInterval(this.memoryInterval);
    wx.redirectTo({
      url: "/pages/games/pockerAnswer/index"
    });
  }
});

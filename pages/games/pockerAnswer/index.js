import regeneratorRuntime from "../../../utils/runtime.js";
const app = getApp();
Page({
  data: {
    startAnwserText: true,
    operationType: "",
    hasToOperationPocker: false,
    pocker: [],
    result: [],
    currentPocker: {
      row: 0,
      column: 0
    }
  },
  onLoad: function() {
    let pocker = [];
    for (let j = 1; j <= 4; j++) {
      let columns = [];
      for (let i = 1; i <= 13; i++) {
        columns.push({
          show: true,
          selected: false,
          row: j,
          column: i
        });
      }
      pocker.push(columns);
    }
    this.setData({
      startAnwserText: app.globalData.gameId === 1,
      pocker
    });
  },
  // 从待选区域选择扑克牌
  selectPocker(e) {
    let {gameId}=app.globalData;
    if(gameId===1){
      this.setData({
        startAnwserText:false
      })
    }
    let { row, column } = e.currentTarget.dataset;
    let { result } = this.data;
    result.push({
      url: "/static/images/pocker/" + column + "-" + row + ".png",
      row,
      column,
      selected: false
    });
    this.setData({
      result,
      currentPocker: {
        row,
        column
      }
    });
    wx.nextTick(() => {
      this.hidePocker();
    });
  },
  hidePocker() {
    let { pocker, currentPocker } = this.data;
    let { row, column } = currentPocker;
    let item = pocker[row - 1][column - 1];
    item.show = false;
    pocker[row - 1][column - 1] = item;
    this.setData({
      pocker
    });
  }
});
